import { ref } from 'vue';
import { useUserStore } from '../stores/useUserStore.js';
import { LoginRequest } from '../Models/Requests/LoginRequest.js';
import { ApiCalling } from '../utils/ApiCalling.js';
import { RegisterRequest } from '../Models/Requests/RegisterRequest.js';
import { BaseResponse } from '../Models/BaseResponse.js';
import { EnumUserType } from '@/Models/User.js';
import { useRouter } from 'vue-router';
import { LoginResponse } from '@/Models/Responses/LoginResponse.js';
import { EnumWorkMode } from '@/Models/Enums/EnumWorkMode.js';
import { ISwichtUserWorkModeRequest } from '@/Models/Requests/SwichtUserWorkModeRequest.js';
import { useAlertStatusStore } from '@/stores/useAlertStatusStore.js';
import { ISwichtUserWorkModeResponse } from '@/Models/Responses/SwichtUserWorkModeResponse.js';
import { SyncAccountInfoRequest } from '@/Models/Requests/SyncAccountInfoRequest.js';
import { SyncAccountInfoResponse } from '@/Models/Responses/SyncAccountInfoResponse.js';

export function useUserInfo(){

    const user = useUserStore();
    const router = useRouter();
    const alertStatus = useAlertStatusStore();

    const IsLogin = () => {
        return user.userInfo.id !== 0;
    }

    const IsValidLoginRequest = (req: LoginRequest) => {
        if(req.userName.length < 1 || req.password.length < 1){
            return false;
        }
        return true;
    }

    const Login = async (req: LoginRequest): Promise<LoginResponse> => {
        if(!IsValidLoginRequest(req)){
            alertStatus.SetAlert('error', 'invalid login info');
            return
        }
        const response = await ApiCalling.Login(req);
        user.userInfo = await response.user;
        if(IsLogin()){
            router.push({ name: "home"});
        }
        return response;
    }

    const syncAccountInfo = async () => {
        const req = <SyncAccountInfoRequest>{
            userId: user.userInfo.id
        }
        const response: SyncAccountInfoResponse = await ApiCalling.SyncAccountInfo(req);
        if(response.errorCode !== 0){
            alertStatus.SetAlert('error', response.errorMessage);
            return
        }
        user.userInfo = response.user;
    }

    const Logout = () => {
        user.userInfo = {
            name: '',
            id: 0,
            onlineId: 0,
            enumUserType: EnumUserType.User,
            profilePicturePath: '',
            workMode: EnumWorkMode.Individual,
            workModeAsString: ''
        };
        window.location.reload();
    }

    const IsValidRegisterRequest = (req: RegisterRequest) => {
        if(req.userName.length < 1 || req.password.length < 1){
            return false;
        }
        return true;
    }

    const Register = async (req: RegisterRequest):Promise<BaseResponse> => {
        if(!IsValidRegisterRequest(req)){
            alertStatus.SetAlert('error', 'invalid registration info');
            return
        }
        const response: BaseResponse = await ApiCalling.Register(req);
        if(await response.errorCode === 0){
            const loginRequest = ref<LoginRequest>({
                userName: req.userName,
                password: req.password,
            })
        }
        return response;
    }

    const SwichtUserWorkMode = async (workMode: EnumWorkMode) => {
        const req = ref<ISwichtUserWorkModeRequest>({
            userId: user.userInfo.id,
            workMode: workMode
        });

        const response: ISwichtUserWorkModeResponse = await ApiCalling.SwichtUserWorkMode(req.value);
        if(response.errorCode === 0){
            user.userInfo.workMode = response.workMode;
            user.userInfo.workModeAsString = response.workModeAsString;
            router.push({ name: "home" });
            alertStatus.SetAlert('success', response.errorMessage)
        }
        else{
            router.push({ name: "home" });
            alertStatus.SetAlert('error', response.errorMessage)
        }
    }

    return {
        IsLogin,
        Login,
        Register,
        Logout,
        SwichtUserWorkMode,
        syncAccountInfo
    }
}

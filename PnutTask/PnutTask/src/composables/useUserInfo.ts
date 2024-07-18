import { ref } from 'vue';
import { useUserStore } from '../stores/useUserStore.js';
import { LoginRequest } from '../Models/Requests/LoginRequest.js';
import { ApiCalling } from '../utils/ApiCalling.js';
import { RegisterRequest } from '../Models/Requests/RegisterRequest.js';
import { BaseResponse } from '../Models/BaseResponse.js';
import { EnumUserType } from '@/Models/User.js';
import { useRouter } from 'vue-router';

export function useUserInfo(){

    const user = useUserStore();
    const router = useRouter();

    const IsLogin = () => {
        return user.userInfo.id !== 0;
    }

    const IsValidLoginRequest = (req: LoginRequest) => {
        if(req.userName.length < 1 || req.password.length < 1){
            return false;
        }
        return true;
    }

    const Login = async (req: LoginRequest) => {
        if(!IsValidLoginRequest(req)){
            alert('Invalid login info')
            return
        }
        const response = await ApiCalling.Login(req);
        user.userInfo = await response.user;
        if(IsLogin()){
            router.push({ name: "todo"});
        }
    }

    const Logout = () => {
        user.userInfo = {
            name: '',
            id: 0,
            onlineId: 0,
            enumUserType: EnumUserType.User,
            profilePicturePath: '',
        };
        window.location.reload();
    }

    const IsValidRegisterRequest = (req: RegisterRequest) => {
        if(req.userName.length < 1 || req.password.length < 1){
            return false;
        }
        return true;
    }

    const Register = async (req: RegisterRequest) => {
        if(!IsValidRegisterRequest(req)){
            alert('Invalid register info');
            return
        }
        const response: BaseResponse = await ApiCalling.Register(req);
        if(response.ErrorCode === 0){
            const loginRequest = ref<LoginRequest>({
                userName: req.userName,
                password: req.password,
            })
            await Login(loginRequest.value);
        }
    }


    return {
        IsLogin,
        Login,
        Register,
        Logout
    }
}

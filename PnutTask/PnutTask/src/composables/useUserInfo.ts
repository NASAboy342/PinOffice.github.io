import { ref } from 'vue';
import { useUserStore } from '../stores/useUserStore.js';
import { LoginRequest } from '../Models/Requests/LoginRequest.js';
import { ApiCalling } from '../utils/ApiCalling.js';
import { RegisterRequest } from '../Models/Requests/RegisterRequest.js';
import { BaseResponse } from '../Models/BaseResponse.js';

export function useUserInfo(){

    const user = useUserStore();

    const Login = async (req: LoginRequest) => {
        const response = await ApiCalling.Login(req);
        user.userInfo = response.user;
    }

    const Register = async (req: RegisterRequest) => {
        const response: BaseResponse = await ApiCalling.Register(req);
        if(response.ErrorCode === 0){
            const loginRequest = ref<LoginRequest>({
                UserName: req.UserName,
                Password: req.Password,
            })
            await Login(loginRequest.value);
        }
    }

    const IsLogin = () => {
        return user.userInfo.id !== 0;
    }

    return {
        IsLogin,
        Login,
        Register
    }
}
import { ref } from 'vue';
import { User } from '../Models/User.js';
import { GetAccountInfoRequest } from '../Models/Requests/GetAccountInfoRequest.js';
import { ApiCalling } from '../utils/ApiCalling.js';
import { GetAccountInfoResponse } from '../Models/Responses/GetAccountInfoResponse.js';
import { useAlertStatusStore } from '../stores/useAlertStatusStore.js'
import { UpdateProfileInfoRequest } from '../Models/Requests/UpdateProfileInfoRequest.js';
import { BaseResponse } from '@/Models/BaseResponse.js';
import { Img } from '@/Models/Img.js';
import { GetProfileImgPathsResponse } from '@/Models/Responses/GetProfileImgPathsResponse.js';
import { cloneDeep } from 'lodash';
import { useUserInfo } from './useUserInfo.js';

export function useAccountInfo(){
    const alertStore = useAlertStatusStore();
    const userInfoBackUpForCancel = ref<User>(<User>{});
    const userInfo = ref<User>(<User>{});
    const isEditting = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const imgPaths = ref<Img[]>(<Img[]>{})
    const isProfileImgChooserVisble = ref<boolean>(false);
    const userInfoCom = useUserInfo();

    const GetAccountInfo = async (userId: number) => {
        const request = <GetAccountInfoRequest>{
            id: userId,
        }
        const user: GetAccountInfoResponse = await ApiCalling.GetAccountInfo(request);
        if (user.errorCode !== 0){
            alertStore.SetAlert('error', user.errorMessage);
            return <GetAccountInfoResponse>{};
        }
        return user;
    }
    const toggleEdit = () => {
        isEditting.value = !isEditting.value;
        userInfoBackUpForCancel.value = cloneDeep(userInfo.value);
    }
    const saveProfileChangeEdit = async () => {
        isLoading.value = true;
        const req = <UpdateProfileInfoRequest>{
            id: userInfo.value.id,
            username: userInfo.value.name,
            profileImgPath: userInfo.value.profilePicturePath,
        } 
        const updateResult: BaseResponse = await ApiCalling.UpdateProfileInfo(req);
        if (updateResult === undefined){
            alertStore.SetAlert('error', 'Api error');
        }
        else if (updateResult.errorCode !== 0){
            alertStore.SetAlert('error', updateResult.errorMessage);
        }
        else{
            const getUserInfo = await GetAccountInfo(userInfo.value.id);
            userInfo.value = getUserInfo.user;
            await userInfoCom.syncAccountInfo();
            alertStore.SetAlert('success', updateResult.errorMessage);
        }
        toggleEdit()
        isLoading.value = false;
    }
    const cancelProfileChangeEdit = () => {
        userInfo.value = cloneDeep(userInfoBackUpForCancel.value);
        toggleEdit()
        isLoading.value = false;
        alertStore.SetAlert('info', 'Changes canceled');
    }
    const GetAllImgPaths = async () => {
        const response: GetProfileImgPathsResponse = await ApiCalling.GetProfileImgPaths();
        if (response.errorCode!== 0){
            alertStore.SetAlert('error', response.errorMessage);
        }
        imgPaths.value = response.imgs;
    }
    const tuggleProfileImgChooserVisble = async () => {
        isProfileImgChooserVisble.value = !isProfileImgChooserVisble.value;
        if(isProfileImgChooserVisble.value === true){
            await GetAllImgPaths()
        }
    }
    const setProfileImgPath = async (newPath: string) => {
        userInfo.value.profilePicturePath = newPath;
        await tuggleProfileImgChooserVisble();
    }
    return{
        GetAccountInfo,
        userInfo,
        isEditting,
        toggleEdit,
        saveProfileChangeEdit,
        isLoading,
        cancelProfileChangeEdit,
        tuggleProfileImgChooserVisble,
        isProfileImgChooserVisble,
        GetAllImgPaths,
        imgPaths,
        setProfileImgPath,
        userInfoBackUpForCancel
    }
}
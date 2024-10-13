<template>
    <div class="account-info-profile-section w-full h-[200px] flex flex-col items-center justify-end pb-1">
        <div class="account-info-profile-section-img-wrapper relative w-[100px] h-[100px] bg-white rounded-full inline-block">
            <ProfileImg :url="accountInfo.userInfo.value.profilePicturePath"></ProfileImg>
            <el-button 
            v-show="accountInfo.isEditting.value" 
            class="absolute opacity-80 top-0 w-[100px] h-[100px] rounded-full "
            @click="accountInfo.tuggleProfileImgChooserVisble()">
                <el-icon>
                    <Edit />
                </el-icon>
            </el-button>
        </div>
        <div class="account-info-profile-section-username text-white font-bold text-lg">{{ accountInfo.userInfo.value.name }}</div>
    </div>
    <div class="account-info-option-section w-full h-[50px] border-t border-b border-gray-200 flex flex-row items-center justify-center">
        <el-button v-if="!accountInfo.isEditting.value" class="account-info-option-section-button" @click="accountInfo.toggleEdit()"><el-icon><Edit /></el-icon>Edit</el-button>
        <el-button 
        v-if="accountInfo.isEditting.value" 
        class="account-info-option-section-button" 
        @click="accountInfo.saveProfileChangeEdit()"
        :disabled="accountInfo.isLoading.value">
            <el-icon>
                <Select />
            </el-icon>
            Save Edit
        </el-button>
        <el-button 
        v-if="accountInfo.isEditting.value" 
        class="account-info-option-section-button" 
        @click="accountInfo.cancelProfileChangeEdit()"
        :disabled="accountInfo.isLoading.value">
            <el-icon>
                <Close />
            </el-icon>
            Cancel Edit
        </el-button>
        <el-button class="account-info-option-section-button"><el-icon><Connection /></el-icon>Connection</el-button>
    </div>
    <div class="account-info-extra-info-section bg-gray-100 w-full min-h-[200px]"></div>
    <el-dialog
    :show-close="false"
    v-model="accountInfo.isProfileImgChooserVisble.value"
    class="account-info-profile-img-chooser w-[1000px] h-[150px]"
    >
        <div class="overflow-x-auto whitespace-nowrap h-[130px] w-full">
            <el-button 
            v-for="(path, index) in accountInfo.imgPaths.value" 
            :key="index" 
            class="account-info-profile-img-chooser-button inline-block  w-[100px] h-[100px] rounded-full p-0"
            @click="accountInfo.setProfileImgPath(path.path)">
                <ProfileImg :url="path.path"></ProfileImg>
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/useUserStore";
import { onMounted, ref } from "vue";
import { useAccountInfo } from "@/composables/useAccountInfo";
import ProfileImg from "@/components/ProfileImg.vue";
import { Img } from "@/Models/Img";
import { cloneDeep } from "lodash";

const userStore = useUserStore();
const accountInfo = useAccountInfo();
interface IProp{
    userId: number
}
const prop = defineProps<IProp>();


onMounted(async () => {
    if (prop.userId === userStore.userInfo.id){
        accountInfo.userInfo.value = cloneDeep(userStore.userInfo);
    }
    else{
        let getAccountInfo = await accountInfo.GetAccountInfo(prop.userId);
        accountInfo.userInfo.value = getAccountInfo.user;
    }
});

</script>

<style>
.account-info-profile-section{
    background-color: var(--Main-color);
}
.account-info-option-section-button{
    border: 0px;
}
.account-info-option-section-button:hover{
    background-color: unset;
}
.account-info-option-section-button:active{
    color: var(--Sub-color);
}
.account-info-profile-img-chooser .el-dialog__header{
    padding: 0px;
}
.account-info-profile-img-chooser-button{
    border: none;
}
.account-info-profile-img-chooser-button:hover{
    border: 3px solid var(--Main-color);
}
</style>
import { defineStore } from "pinia";
import { ref } from "vue";
import { EnumUserType, User } from "../Models/User.js";
import { EnumWorkMode } from "@/Models/Enums/EnumWorkMode.js";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<User>({
        name: '',
        id: 0,
        onlineId: 0,
        enumUserType: EnumUserType.User,
        profilePicturePath: '',
        workMode: EnumWorkMode.Individual,
        workModeAsString: ''
    });

    return{
        userInfo,
    }
},{
    persist: true
});
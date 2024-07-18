import { defineStore } from "pinia";
import { ref } from "vue";
import { EnumUserType, User } from "../Models/User.js";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<User>({
        name: '',
        id: 0,
        onlineId: 0,
        enumUserType: EnumUserType.User,
        profilePicturePath: '',
    });

    return{
        userInfo,
    }
},{
    persist: true
});
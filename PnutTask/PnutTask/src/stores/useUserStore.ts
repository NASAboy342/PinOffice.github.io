import { defineStore } from "pinia";
import { ref } from "vue";
import { EnumUserType, User } from "../Models/User";

export const useUserStore = defineStore('counter', () => {
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
});
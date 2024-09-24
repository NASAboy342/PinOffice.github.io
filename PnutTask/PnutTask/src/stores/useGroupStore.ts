import { defineStore } from "pinia";
import { Group } from "../Models/Responses/AllMemberedGroupResponse.js";
import { ref } from "vue";

export const useGroupStore = defineStore('group', () => {
    const recentlyEnteredGroup = ref<Group>({
        groupId: 0,
        name: '',
        description: '',
        joinOn: '',
        position: ''
    })

    return {
        recentlyEnteredGroup
    }
})
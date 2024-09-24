import { ref } from 'vue';
import { GetAllMemberedGroupsRequest } from '../Models/Requests/GetAllMemberedGroup.js';
import { ApiCalling } from '../utils/ApiCalling.js';
import { useUserStore } from '../stores/useUserStore.js';
import { AllMemberedGroupResponse, Group } from '@/Models/Responses/AllMemberedGroupResponse.js';
import { useGroupStore } from '../stores/useGroupStore.js';

export function useGroupCard(){

    const user = useUserStore();
    const group = useGroupStore();

    const GetAllGroup = async () => {
        const req = ref<GetAllMemberedGroupsRequest>({
            userId: user.userInfo.id
        })
        const response:AllMemberedGroupResponse = await ApiCalling.GetAllMemberedGroups(req.value);
        return response;
    }
    const SetRecentlyEnteredGroup = (recentlyEnteredGroup: Group) => {
        group.recentlyEnteredGroup = recentlyEnteredGroup
    }
    const UnsetRecentlyEnteredGroup = () => {
        group.recentlyEnteredGroup = {
            groupId: 0,
            name: '',
            description: '',
            joinOn: '',
            position: ''
        }
    }

    return {
        GetAllGroup,
        SetRecentlyEnteredGroup,
        UnsetRecentlyEnteredGroup
    }
}
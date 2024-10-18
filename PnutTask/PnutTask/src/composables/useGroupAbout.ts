import {  onMounted, ref } from "vue"
import { EnumGroupPosition } from "@/Models/Enums/EnumGroupPosition.js";
import { User } from "@/Models/User.js";
import { AddGroupMemberRequest } from "@/Models/Requests/AddGroupMemberRequest.js";
import { useGroupStore } from "@/stores/useGroupStore.js";
import { useUserStore } from "@/stores/useUserStore.js";
import { ApiCalling } from "@/utils/ApiCalling.js";
import { BaseResponse } from "@/Models/BaseResponse.js";
import { useAlertStatusStore } from "@/stores/useAlertStatusStore.js";
import { GetGroupMembersResponse } from "@/Models/Responses/GetGroupMembersResponse.js";
import { useGroupCard } from "./useGroupCard.js";

export function useGroupAbout(){

    const groupStore = useGroupStore();
    const userStore = useUserStore();
    const alertStore = useAlertStatusStore();
    const groupCard = useGroupCard();
    
    const newMemberInfo = ref<User>(<User>{});
    const newMembersPosition = ref<EnumGroupPosition>(EnumGroupPosition.Member)
    const newMembersPositionAsString = ref<string>(EnumGroupPosition[newMembersPosition.value]);

    const members = ref<GetGroupMembersResponse>(<GetGroupMembersResponse>{});
    const membersCount = ref<number>();

    const triggerSyncGroupMembers = async () => {
        members.value = await groupCard.GetGroupMembers();
        membersCount.value = members.value.groupMembers.length;
    }
    onMounted(async () => {
       await triggerSyncGroupMembers();
    });

    const addMemberConfirmDialogVisible = ref<boolean>(false);
    const selecteNewMemberId = (userInfo) => {
      newMemberInfo.value = userInfo;
      addMemberConfirmDialogVisible.value = true;
    };
    const CloseAddMemberConfirmDialog = () => {
      addMemberConfirmDialogVisible.value = false;
    };

    const changeMemberPosition = (newPosition: EnumGroupPosition) => {
        newMembersPosition.value = newPosition;
        newMembersPositionAsString.value = EnumGroupPosition[newPosition];
    };
    const addMember = async () => {
        const req = <AddGroupMemberRequest>{
            groupId: groupStore.recentlyEnteredGroup.groupId,
            userId: newMemberInfo.value.id,
            userPosition: newMembersPosition.value,
            inviterUserId: userStore.userInfo.id
        }
        const result: BaseResponse = await ApiCalling.AddGroupMember(req);
        if(result.errorCode !== 0){
            CloseAddMemberConfirmDialog();
            alertStore.SetAlert('error', result.errorMessage)
        }
        else{
            await triggerSyncGroupMembers();
            CloseAddMemberConfirmDialog();
            alertStore.SetAlert('success', 'new member added successfully')
        }
    }

    return{
        newMembersPosition,
        newMembersPositionAsString,
        changeMemberPosition,
        newMemberInfo,
        members,
        membersCount,
        addMember,
        addMemberConfirmDialogVisible,
        selecteNewMemberId,
        CloseAddMemberConfirmDialog
    }
}
<template>
  <div class="about-wrapper bg-white w-full">
    <div
      class="about-wrapper-group-profile p-5 flex flex-col items-center w-full"
    >
      <img
        class="w-[100px]"
        src="\public\img\GroupIcon.png"
        alt="\public\img\GroupIcon.png"
      />
      <div class="about-wrapper-group-profile-name text-xl font-bold">
        {{ groupStore.recentlyEnteredGroup.name }}
      </div>
      <div class="about-wrapper-group-profile-member-count opacity-50">
        {{ membersCount }} members
      </div>
      <el-button
        class="w-full add-members-button mt-4"
        @click="searchDialogFormVisible = true"
        >Add Members</el-button
      >
      <div class="about-wrapper-group-profile-buttom-line w-full"></div>
    </div>
    <div
      class="about-wrapper-group-members flex flex-col items-center text-xl px-5"
    >
      <!-- <div>Members</div> -->
      <el-table
        :data="members.groupMembers"
        class="w-full about-wrapper-group-members-table"
      >
        <el-table-column prop="img" label="" width="80">
          <template #default="{ row }">
            <img
              class="w-full"
              :src="
                row.img == '' || row.img == undefined
                  ? '\\public\\img\\broken-img.png'
                  : row.img
              "
              :alt="row.img"
            />
          </template>
        </el-table-column>
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="position" label="Position" />
      </el-table>
    </div>
    <SearchUserDialog
      :dialog-form-visible="searchDialogFormVisible"
      @select-user-id="selecteNewMemberId"
      @close-dialog="searchDialogFormVisible = false"
    >
    </SearchUserDialog>
    <el-dialog
      v-model="addMemberConfirmDialogVisible"
      width="500"
      @close="CloseAddMemberConfirmDialog()"
      :show-close="false"
      class="add-member-confirm-dialog"
    >
      <div
        class="add-member-confirm-dialog-content-wrapper flex flex-col items-center"
      >
        <div>
          Are you sure that you want to add this user as a member of this group?
        </div>
        <div class="add-member-confirm-dialog-profile-img w-[80px] mt-7 mb-6">
          <img
            class="w-full"
            :src="
              newMemberInfo.profilePicturePath == '' ||
              newMemberInfo.profilePicturePath == undefined
                ? '\\public\\img\\broken-img.png'
                : newMemberInfo.profilePicturePath
            "
            alt="\public\img\broken-img.png"
          />
        </div>
        <div class="add-member-confirm-dialog-username text-black">
          Username: <span class="font-bold">{{ newMemberInfo.name }}</span>
        </div>
        <div class="add-member-confirm-dialog-user-id text-black">
          Id: <span class="font-bold">{{ newMemberInfo.id }}</span>
        </div>
        <div
          class="add-member-confirm-dialog-position text-black flex flex-row gap-2"
        >
          As:
          <el-select
            remote
            v-model="groupAbout.newMembersPositionAsString"
            placeholder="Select member position"
            class="add-member-confirm-dialog-position-select w-32"
            default-first-option
          >
            <el-option
              label="Member"
              @click="
                groupAbout.newMembersPosition.value = EnumGroupPosition.Member
              "
            />
            <el-option
              label="Admin"
              @click="
                groupAbout.newMembersPosition.value = EnumGroupPosition.Admin
              "
            />
          </el-select>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="CloseAddMemberConfirmDialog()"
            class="add-member-confirm-dialog-cancel-bt"
            >Cancel</el-button
          >
          <el-button type="primary">Yes</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useGroupCard } from "@/composables/useGroupCard";
import { GetGroupMembersResponse } from "@/Models/Responses/GetGroupMembersResponse";
import { useGroupStore } from "@/stores/useGroupStore";
import { onMounted, ref } from "vue";
import SearchUserDialog from "@/components/SearchUserDialog.vue";
import { User } from "@/Models/User";
import { useGroupAbout } from "@/composables/useGroupAbout";
import { EnumGroupPosition } from "@/Models/Enums/EnumGroupPosition";

const groupCard = useGroupCard();
const groupStore = useGroupStore();
const groupAbout = useGroupAbout();

const members = ref<GetGroupMembersResponse>(<GetGroupMembersResponse>{});
const membersCount = ref<number>();
onMounted(async () => {
  members.value = await groupCard.GetGroupMembers();
  membersCount.value = members.value.groupMembers.length;
});
const searchDialogFormVisible = ref<boolean>(false);
const newMemberInfo = ref<User>(<User>{});
const addMemberConfirmDialogVisible = ref<boolean>(false);
const selecteNewMemberId = (userInfo) => {
  newMemberInfo.value = userInfo;
  addMemberConfirmDialogVisible.value = true;
};
const CloseAddMemberConfirmDialog = () => {
  addMemberConfirmDialogVisible.value = false;
};
</script>

<style>
.about-wrapper-group-profile-buttom-line {
  border-bottom: 1px solid var(--Main-color);
  margin-top: 10px;
}
.about-wrapper-group-members-table thead {
  color: black;
}
.add-members-button:hover {
  background-color: var(--hover-bg-main-color);
  border-color: var(--Main-color);
}
.add-members-button:active {
  background-color: var(--Main-color);
  color: white;
}
.add-member-confirm-dialog-cancel-bt:hover {
  background-color: var(--hover-bg-main-color);
  border-color: var(--Main-color);
}
.add-member-confirm-dialog-cancel-bt:active {
  background-color: var(--Main-color);
  color: white;
}
</style>

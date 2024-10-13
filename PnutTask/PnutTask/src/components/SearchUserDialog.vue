<template>
  <el-dialog
    v-model="prop.dialogFormVisible"
    width="500"
    @close="CloseDialog()"
    :show-close="false"
  >
    <el-form>
      <el-form-item>
        <el-input
          v-model="searchUser.searchInput.value"
          placeholder="Username or Id"
          suffix-icon="search"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="searchUser.searchResult.value.users"
      class="w-full search-user-result-table"
    >
      <el-table-column prop="profilePicturePath" label="">
        <template #default="{ row }">
          <div @click="SelectUser(row)" class="cursor-pointer w-[50px]"><ProfileImg :url="row.profilePicturePath"></ProfileImg></div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="Id">
        <template #default="{ row }">
          <div @click="SelectUser(row)" class="cursor-pointer">{{ row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name">
        <template #default="{ row }">
          <div @click="SelectUser(row)" class="cursor-pointer">{{ row.name }}</div>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="CloseDialog()" class="search-user-dialog-cancel-bt">Cancel</el-button>
        <el-button type="primary" @click="searchUser.SearchUser()"
          >Find</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { UseSearchUser } from "@/composables/useSearchUser";
import { Pointer } from "@element-plus/icons-vue/dist/types/components/index.js";
import { User } from "@/Models/User";
import ProfileImg from "@/components/ProfileImg.vue"

interface Prop {
  dialogFormVisible: boolean;
}
const emit = defineEmits(["close-dialog", "select-user-id"]);
const prop = defineProps<Prop>();
const searchUser = UseSearchUser();

const dialogFormVisible = ref<boolean>(false);
computed(() => {
  dialogFormVisible.value = prop.dialogFormVisible;
});
const CloseDialog = () => {
  dialogFormVisible.value = false;
  emit("close-dialog", dialogFormVisible.value);
};
const SelectUser = (userInfo: User) => {
  emit("select-user-id", userInfo);
  CloseDialog();
};
</script>

<style>
.search-user-dialog-cancel-bt:hover{
    background-color: var(--hover-bg-main-color);
    border-color: var(--Main-color)
}
.search-user-dialog-cancel-bt:active{
    background-color: var(--Main-color);
    color: white;
}
</style>

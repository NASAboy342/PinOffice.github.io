<template>
  <el-select
    remote
    v-model="userStore.userInfo.workModeAsString"
    placeholder="please select current status"
    class="work-mode-select"
  >
    <el-option label="Individual" @click="user.SwichtUserWorkMode(EnumWorkMode.Individual)"/>
    <el-option label="Cooperate" @click="user.SwichtUserWorkMode(EnumWorkMode.Cooperate)"/>
  </el-select>
</template>

<script lang="ts" setup>
import { useUserInfo } from "@/composables/useUserInfo";
import { EnumWorkMode } from "@/Models/Enums/EnumWorkMode";
import { useUserStore } from "@/stores/useUserStore";
import { ref } from "vue";

const userStore = useUserStore();
const user = useUserInfo();
</script>
<style>
.work-mode-select {
  width: 100px;
}
.work-mode-select
  > .el-select__wrapper.el-tooltip__trigger.el-tooltip__trigger {
  padding: 0px 5px;
  height: 20px;
  min-height: 20px;
  font-size: small;
  border-color: solid var(--Main-color);
  box-shadow: 0px 0px 0px 1px var(--Main-color);
}
</style>

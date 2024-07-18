<template>
  <el-dropdown>
    <el-icon class="more-icon">
      <Menu />
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="user.Logout()">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useUserInfo } from "@/composables/useUserInfo";

const user = useUserInfo();
</script>
<style scoped>
.more-icon {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  font-size: large;
}
</style>

<template>
    <div class="username">{{ userInfo.userInfo.name }}</div>
    <el-icon class="user-icon">
      <User />
    </el-icon>
    <div class="border-right"></div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/useUserStore";

const userInfo = useUserStore();
</script>

<style scoped>
.border-right{
    height: 20px;
    border-right: 1px solid var(--Main-color);
}
.user-icon{
    color: var(--Main-color);
}
.username{
    color: var(--Main-color);
}
</style>
<template>
    <div class="username">{{ userInfo.userInfo.name }}</div>
    <ProfileImg class="w-[22px]" :url="userInfo.userInfo.profilePicturePath"></ProfileImg>
    <div class="border-right"></div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/useUserStore";
import ProfileImg from "@/components/ProfileImg.vue";

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
<template>
    <AccountInfo :user-id="userStore.userInfo.id"></AccountInfo>
</template>
<script lang="ts" setup>
import AccountInfo from "@/components/AccountInfo.vue";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();
</script>
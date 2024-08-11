<template>
  <HomeForIndividual
    v-if="userStore.userInfo.workMode === EnumWorkMode.Individual"
  ></HomeForIndividual>
  <HomeForCooperate v-else></HomeForCooperate>
</template>

<script setup lang="ts">
import HomeForIndividual from "@/components/HomeForIndividual.vue";
import HomeForCooperate from "@/components/HomeForCooperate.vue";
import { EnumWorkMode } from "@/Models/Enums/EnumWorkMode";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();
</script>

<style scoped></style>

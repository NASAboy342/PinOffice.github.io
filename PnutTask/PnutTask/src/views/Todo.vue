<template>
    <h1 class="pageTitle">Todo tasks</h1>
    <TaskTable :getTaskRequest="getTaskRequest" />
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import TaskTable from '@/components/TaskTable.vue';
import * as GetTaskRequest from '@/Models/Requests/GetTaskRequest';
import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const getTaskRequest = ref<GetTaskRequest.GetTaskRequest>({
    UserId: userStore.userInfo.id,
    IsGetAllStatus: false,
    IsGetAllDate: true,
    Status: EnumTaskStatus.Todo,
    StartDate: new Date,
    EndDate: new Date
});
</script>

<style scoped>
.pageTitle{
    margin-left: 20px;
}
</style>
<template>
    <h1 class="pageTitle">Done tasks</h1>
    <TaskTable :getTaskRequest="getTaskRequest" />
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import TaskTable from '@/components/TaskTable.vue';
import * as GetTaskRequest from '@/Models/Requests/GetTaskRequest';
import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest';
const getTaskRequest = ref<GetTaskRequest.GetTaskRequest>({
    UserId: 1,
    IsGetAllStatus: false,
    IsGetAllDate: true,
    Status: EnumTaskStatus.Done,
    StartDate: new Date,
    EndDate: new Date
});
</script>

<style scoped>
.pageTitle{
    margin-left: 20px;
}
</style>
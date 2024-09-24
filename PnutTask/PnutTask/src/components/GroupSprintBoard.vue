<template>
    <div class="group-sprint-board relative w-full grid grid-cols-4 gap-3 p-3">
        <SprintBoard :enumTaskStatus = EnumTaskStatus.Todo></SprintBoard>
        <SprintBoard :enumTaskStatus = EnumTaskStatus.InProgress></SprintBoard>
        <SprintBoard :enumTaskStatus = EnumTaskStatus.Pending></SprintBoard>
        <SprintBoard :enumTaskStatus = EnumTaskStatus.Done></SprintBoard>
    </div>
</template>
<script lang="ts" setup>
import SprintBoard from "@/components/SprintBoard.vue";
import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest';
</script>

<style>
</style>
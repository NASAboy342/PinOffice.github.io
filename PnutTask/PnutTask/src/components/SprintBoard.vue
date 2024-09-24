<template>
    <div class="sprint-board flex flex-col items-center">
        <div class="sprint-board-header w-full text-center">
            <span>{{boardTitle}}</span>
        </div>
        <div class="sprint-board-body">
            <span></span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest';


interface Prop{
    enumTaskStatus: EnumTaskStatus
}
const prop = defineProps<Prop>();
const boardTitle = EnumTaskStatus[prop.enumTaskStatus];
</script>

<style>
.sprint-board{
    border: 1px solid var(--Main-color);
    border-radius: 5px;
    min-height: 800px;
    background-color: white;
}
.sprint-board-header{
    color: var(--Main-color);
    border-bottom: 1px solid var(--Main-color);
}
</style>
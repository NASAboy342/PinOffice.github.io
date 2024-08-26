<template>
    <div class="card-container flex gap-2 flex-wrap justify-center">
        <div v-for="group in allGroups" :key="group.groupId" class="card w-80 h-40 rounded-2xl pt-3 flex flex-col justify-between">
            <div class="group-name text-center font-bold relative w-[100%]">{{ group.name }}</div>
            <div class="group-description text-xs p-2 h-full text-gray-500">{{ group.description }}</div>
            <div class="extra-info relative bottom-0 h-5 px-4 flex justify-center">
                <div class="text-xs text-gray-500">{{ group.position }}</div>
            </div>
        </div>
        <div class="card w-80 h-40 rounded-2xl flex flex-col justify-center items-center">
            <el-icon class="w-full h-full">
                <CirclePlus class="add-group-icon text-6xl text-gray-500"/>
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AllMemberedGroupResponse } from '@/Models/Responses/AllMemberedGroupResponse';
import { ref } from 'vue';

const allGroups = ref<AllMemberedGroupResponse[]>([
    {
        groupId: 1,
        name: 'Pilot1',
        description: 'WL Pilot',
        joinOn: '',
        position: 'Member'
    },
    {
        groupId: 3,
        name: 'Pilot2',
        description: 'LCG Pilot',
        joinOn: '',
        position: 'Member'
    },
    {
        groupId: 4,
        name: 'Pilot3',
        description: 'BE Pilot',
        joinOn: '',
        position: 'Member'
    },
    {
        groupId: 5,
        name: 'Pilot4',
        description: 'FE Pilot',
        joinOn: '',
        position: 'Member'
    },
    {
        groupId: 8,
        name: 'Pilot5',
        description: 'Game Pilot',
        joinOn: '',
        position: 'Member'
    },
])
</script>

<style scoped>
.card{
    border: 1px solid var(--Main-color);
}
.group-name{
    border-bottom: 1px solid var(--Main-color);
    color: var(--Main-color);
}
.extra-info{
    border-top: 1px solid var(--Main-color);
}
</style>
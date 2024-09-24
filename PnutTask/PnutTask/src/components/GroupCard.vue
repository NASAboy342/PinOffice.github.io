<template>
    <div class="card-container flex gap-2 flex-wrap justify-center">
        <RouterLink v-for="group in allGroups.memberedGroups" :key="group.groupId" class="card w-80 h-40 rounded-2xl pt-3 flex flex-col justify-between" @click="groupCard.SetRecentlyEnteredGroup(group)" to="/group">
            <div class="group-name text-center font-bold relative w-[100%]">{{ group.name }}</div>
            <div class="group-description text-xs p-2 h-full text-gray-500">{{ group.description }}</div>
            <div class="extra-info relative bottom-0 h-5 px-4 flex justify-center">
                <div class="text-xs text-gray-500">{{ group.position }}</div>
            </div>
        </RouterLink>
        <div class="card w-80 h-40 rounded-2xl flex flex-col justify-center items-center">
            <el-icon class="w-full h-full">
                <CirclePlus class="add-group-icon text-6xl text-gray-500"/>
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AllMemberedGroupResponse } from '@/Models/Responses/AllMemberedGroupResponse';
import { onMounted, ref } from 'vue';
import { useGroupCard } from '@/composables/useGroupCard';
import { RefSymbol } from '@vue/reactivity';

const groupCard = useGroupCard();

const allGroups = ref<AllMemberedGroupResponse>({} as AllMemberedGroupResponse);

onMounted( async () => {
    allGroups.value = await groupCard.GetAllGroup();
})
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
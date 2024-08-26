<template>
    <div class="p-4">
        <div class="title font-bold text-xl text-center mt-4 mb-7">Groups That You Are Currently In</div>
        <GroupCard></GroupCard>
    </div>
    
</template>

<script lang="ts" setup>
import GroupCard from '@/components/GroupCard.vue';
</script>

<style scoped>
.title{
    color: var(--Main-color);
}
</style>
<template>
    <div class="time-style">
        {{ currentTime }}
    </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref<string>(format(new Date(), 'yyyy-MM-dd: hh:mm:ss'));

const updateClock = () => {
    currentTime.value = format(new Date(), 'yyyy-MM-dd: hh:mm:ss');
};

const intervalId = ref<number>(0);

onMounted(() => {
    intervalId.value = setInterval(updateClock, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId.value);
});

</script>
<style scoped>
.time-style{
    font-size: small;
    color: var(--Sub-color);
}
</style>
<template>
  <el-button @click="alertStatus.SetAlert('error', 'Test Error')"> Get error </el-button>
</template>

<script lang="ts" setup>
import Alert  from '@/components/Alert.vue'
import { useAlertStatusStore } from '@/stores/useAlertStatusStore';
import { ref } from 'vue';
var alertStatus = useAlertStatusStore();
</script>



<style scoped>
</style>

<template>
  <div style="max-width: 600px">
    <el-alert
      v-if="alertStatus.typeToDisplay === 'success'"
      title="Success"
      type="success"
      :description="alertStatus.descriptionToDisplay"
      show-icon
    />
    <el-alert
      v-else-if="alertStatus.typeToDisplay === 'info'"
      title="Info"
      type="info"
      :description="alertStatus.descriptionToDisplay"
      show-icon
    />
    <el-alert
      v-else-if="alertStatus.typeToDisplay === 'warning'"
      title="Warning"
      type="warning"
      :description="alertStatus.descriptionToDisplay"
      show-icon
    />
    <el-alert
      v-else-if="alertStatus.typeToDisplay === 'error'"
      title="Error"
      type="error"
      :description="alertStatus.descriptionToDisplay"
      show-icon
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useAlertStatusStore } from "@/stores/useAlertStatusStore";

const alertStatus = useAlertStatusStore();


const intervalId = ref<number>(0);
onMounted(() => {
    intervalId.value = setInterval(alertStatus.ClearAlert, 5000);
});
onUnmounted(() => {
    clearInterval(intervalId.value);
});

</script>

<style scoped>
.el-alert {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 400px;
  margin: 20px;
  z-index: var(--top-z-index);
}
</style>

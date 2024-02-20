<template>
  <!--<todo-task-layout></todo-task-layout>-->
  <Spin-port-layout-mobile v-if="isMobile === true"></Spin-port-layout-mobile>
  <Spin-port-layout-desktop v-else></Spin-port-layout-desktop>
</template>

<style>
body{
  padding: 0px 0px;
  margin: unset;
}
</style>
<script lang="ts" setup>
  import { ref } from 'vue';

  const isMobile = ref(screen.width <= 760);
</script>
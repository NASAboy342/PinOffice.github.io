<template>
  <el-select remote v-model="user.userInfo.workMode" placeholder="please select current status" class="work-mode-select" >
    <el-option label="Individual" :value="EnumWorkMode.Individual"/>
    <el-option label="Cooperate" :value="EnumWorkMode.Cooperate"/>
  </el-select>

</template>

<script lang="ts" setup>
import { EnumWorkMode } from '@/Models/Enums/EnumWorkMode';
import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue'

const user = useUserStore();

</script>
<style>
.work-mode-select{
  width: 100px;
}
.work-mode-select> .el-select__wrapper.el-tooltip__trigger.el-tooltip__trigger{
  padding: 0px 5px;
  height: 20px;
  min-height: 20px;
  font-size: small;
}
</style>

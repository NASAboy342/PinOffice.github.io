<template>
  <table class="group-wrapper flex flex-row w-full flex">
    <td class="w-[200px]">
        <div class="group-wrapper-group-name">{{ groupStore.recentlyEnteredGroup.name }}</div>
      <el-menu
        class="group-nav px-2 py-2"
        :default-active="activeIndex"
        mode="vertical"
      >
        <el-menu-item
          v-for="(groupNavObject, index) in groupNavObjects"
          :key="index"
          class="group-nav-bottun rounded-md mt-2"
          :index="index"
        >
          {{ groupNavObject.title }}
        </el-menu-item>
      </el-menu>
    </td>
    <td class="w-full group-work-space">
      <GroupSprintBoard></GroupSprintBoard>
    </td>
  </table>
</template>
<script lang="ts" setup>
import { ElButton } from "element-plus";
import { ref } from "vue";
import GroupSprintBoard from "@/components/GroupSprintBoard.vue";
import { useGroupStore } from "@/stores/useGroupStore";

const groupStore = useGroupStore();
interface IGroupNavObject {
  title: string;
  icon: string;
  isActive: boolean;
}

const activeIndex = ref(0);
const groupNavObjects = ref<IGroupNavObject[]>([
  {
    title: "Sprint Board",
    icon: "",
    isActive: true,
  },
  {
    title: "About group",
    icon: "",
    isActive: false,
  },
]);
</script>
<style>
.group-wrapper {
    position: relative;
    width: 100%;
    border-bottom: 1px solid var(--Main-color);
    border-collapse: collapse;
}
.group-wrapper > td{
    border: 1px solid var(--Main-color);
}
.group-nav {
  position: relative;
  border: 0px;
}
.el-menu-item.group-nav-bottun {
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px;
  border-right: 1px;
  border-color: var(--Main-color);
  width: 90%;
  height: 30px;
}
.el-menu-item.group-nav-bottun:hover {
  background-color: var(--el-menu-hover-bg-color);
  color: var(--Main-color);
}
.el-menu-item.is-active.group-nav-bottun {
  border: 2px solid var(--Main-color);
}
.group-wrapper-group-name{
    width: 100%;
    text-align: center;
    padding: 5px;
    font-size: large;
    font-weight: bold;
    color: var(--Main-color);
    border-bottom: 1px solid var(--Main-color);
}
.group-work-space{
    background-image: linear-gradient(to bottom, var(--el-menu-hover-bg-color), white);
}
</style>

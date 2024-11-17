<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import LiveClock from "@/components/LiveClock.vue";
import Login from "@/components/Login.vue";
import { useUserInfo } from "@/composables/useUserInfo";
import { useUserStore } from "./stores/useUserStore";
import MenuBox from "@/components/MenuBox.vue";
import Alert from "@/components/Alert.vue";
import Profile from "@/components/Profile.vue";
import WorkModeSwicher from "@/components/WorkModeSwicher.vue";
import { EnumWorkMode } from "./Models/Enums/EnumWorkMode";

const router = useRouter();
const route = useRoute();
const user = useUserInfo();
const userStore = useUserStore();

const activeIndex = ref("1");
const handleSelect = () => {};
onMounted(() => {
  if (!user.IsLogin() && route.path !== "/register") {
    router.push({ name: "login" });
  }
});
const isRootAccount = ref(userStore.userInfo.id === 1);

</script>

<template>
  <Alert/>
  <div v-if="!user.IsLogin()">
    <RouterView />
  </div>
  <div v-else-if="userStore.userInfo.workMode === EnumWorkMode.Individual">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :ellipsis="false"
    >
      <el-menu-item index="0" class="logo"
        ><img src="\BaseLogo.png" alt="\BaseLogo.png"
      /></el-menu-item>
      <el-menu-item index="1">
        <RouterLink to="/">Home</RouterLink>
      </el-menu-item>
      <el-menu-item index="2">
        <RouterLink to="/todo">Todo</RouterLink>
      </el-menu-item>
      <el-menu-item index="3">
        <RouterLink to="/inProgress">InProgress</RouterLink>
      </el-menu-item>
      <el-menu-item index="4">
        <RouterLink to="/pending">Pending</RouterLink>
      </el-menu-item>
      <el-menu-item index="5">
        <RouterLink to="/done">Done</RouterLink>
      </el-menu-item>
      <el-menu-item index="6">
        <RouterLink to="/failed">Failed</RouterLink>
      </el-menu-item>
      <el-menu-item index="7">
        <RouterLink to="/about">About</RouterLink>
      </el-menu-item>
      <el-menu-item index="8" v-if="isRootAccount">
        <RouterLink to="/testPage">Test-Page</RouterLink>
      </el-menu-item>
      <div class="flex-grow">
        <WorkModeSwicher></WorkModeSwicher>
        <Profile></Profile>
        <LiveClock></LiveClock>
        <MenuBox></MenuBox>
      </div>
    </el-menu>
    <RouterView />
    <el-footer class="footer">
      <p>&copy; 2024 Pin Sopheaktra</p>
    </el-footer>
  </div>
  <div v-else-if="userStore.userInfo.workMode === EnumWorkMode.Cooperate">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :ellipsis="false"
    >
      <el-menu-item index="0" class="logo"
        ><img src="\public\BaseLogo.png" alt="\public\BaseLogo.png"
      /></el-menu-item>
      <el-menu-item index="1">
        <RouterLink to="/">Home</RouterLink>
      </el-menu-item>
      <el-menu-item index="2">
        <RouterLink to="/about">About</RouterLink>
      </el-menu-item>
      <div class="flex-grow">
        <WorkModeSwicher></WorkModeSwicher>
        <Profile></Profile>
        <LiveClock></LiveClock>
        <MenuBox></MenuBox>
      </div>
    </el-menu>
    <RouterView />
    <el-footer class="footer">
      <p>&copy; 2024 Pin Sopheaktra</p>
    </el-footer>
  </div>
</template>

<style>
:root {
  --Main-color: orange;
  --hover-bg-main-color: rgba(255, 166, 0, 0.348);
  --hover-border-main-color: orange;
  --Sub-color: darkorange;
  --Text-on-main-color: black;
  --Text-on-sub-color: white;
  --el-color-primary: var(--Main-color);
  --el-menu-border-color: var(--Main-color);
  --el-menu-hover-bg-color: rgba(255, 166, 0, 0.132);
  --el-button-border-color: var(--Main-color);
  --el-button-hover-bg-color: rgb(255, 203, 105);
  --primary-button-hove-bg: rgb(255, 192, 74);
  --nav-bar-background: rgba(255, 166, 0, 0.132);
  --top-z-index: 1;
  --second-z-index: 2;
  --third-z-index: 3;
}

img {
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: Inter, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

h1 {
  color: var(--Main-color);
}

a {
  text-decoration: none;
}

.el-button.el-button--normal:hover {
  background-color: var(--el-menu-hover-bg-color);
  border-color: var(--el-menu-border-color);
}
.el-button.el-button--primary:hover {
  background-color: var(--primary-button-hove-bg);
  border-color: var(--el-menu-border-color);
}
</style>

<style scoped>
.el-menu--horizontal.el-menu {
  border-top: 2px solid var(--el-color-primary);
}

.el-menu-item.logo {
  width: 80px;
}
.footer {
  padding-top: 20px;
  background-color: var(--Main-color);
  height: 300px;
  margin-top: 100px;
  color: var(--Text-on-sub-color);
}
.flex-grow {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;
  gap: 10px;
}
</style>


<template>
  <el-form class="register-form">
    <el-form-element class="login-title">
      <img class="logo-img" src="\public\BaseLogo.png" alt="\public\BaseLogo.png">
      <h1>PnutTask Login</h1>
    </el-form-element>
    <el-form-element>
      <el-input v-model="loginRequest.userName" placeholder="Username" />
    </el-form-element>
    <el-form-element>
      <el-input v-model="loginRequest.password" placeholder="Password" />
    </el-form-element>
    <el-form-element class="login-button">
      <el-button @click="userInfo.Login(loginRequest)" type="primary" >Login</el-button>
      <el-button @click="GotoRegister" type="normal" >Register</el-button>
    </el-form-element>
  </el-form>
</template>

<script lang="ts" setup>
import { useUserInfo } from "@/composables/useUserInfo";
import { LoginRequest } from "@/Models/Requests/LoginRequest";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const GotoRegister = () => {
  router.push({ name: 'register'});
}

const userInfo = useUserInfo()
const loginRequest = ref<LoginRequest>({
  userName: '',
  password: ''
})
</script>

<style scoped>
a{
  color: black;
}
.register-form{
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  position: sticky;
  width: 100%;
  height: 100vh;
}
.el-input{
  width: 300px;
}
.logo-img{
  width: 50px;
  height: fit-content;
}
.login-title{
  display: flex;
  align-items: center;
  gap: 5px;
}
.login-button{
  margin-top: 20px;
}
</style>
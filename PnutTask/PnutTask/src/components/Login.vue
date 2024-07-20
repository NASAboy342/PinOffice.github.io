
<template>
  <el-form class="register-form">
    <el-form-element class="login-title">
      <img class="logo-img" src="\public\BaseLogo.png" alt="\public\BaseLogo.png">
      <h1>PnutTask Login</h1>
    </el-form-element>
    <el-form-element>
      <el-input v-model="loginRequest.userName" placeholder="Username" @input="CheckUserNameFromat()"/>
    </el-form-element>
    <el-form-element>
      <el-input v-model="loginRequest.password" placeholder="Password" @input="CheckPasswordFromat()" :show-password="true"/>
    </el-form-element>
    <el-form-element class="login-button">
      <el-button @click="ProccedLogin()" type="primary" >Login</el-button>
      <el-button @click="GotoRegister" type="normal" >Register</el-button>
    </el-form-element>
  </el-form>
</template>

<script lang="ts" setup>
import { useUserInfo } from "@/composables/useUserInfo";
import { LoginRequest } from "@/Models/Requests/LoginRequest";
import { LoginResponse } from "@/Models/Responses/LoginResponse";
import { useAlertStatusStore } from "@/stores/useAlertStatusStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const alertStatus = useAlertStatusStore();
const router = useRouter();
const GotoRegister = () => {
  router.push({ name: 'register'});
}

const userInfo = useUserInfo()
const loginRequest = ref<LoginRequest>({
  userName: '',
  password: ''
})
const ProccedLogin = async () => {
  const loginResponse: LoginResponse = await userInfo.Login(loginRequest.value);
  if(loginResponse.errorCode !== 0){
    alertStatus.SetAlert('error', loginResponse.errorMessage);
  }
  else{
    alertStatus.SetAlert('success', loginResponse.errorMessage);
  }
}
const CheckUserNameFromat = () => {
  const regExp = /[^\w]/g;
  loginRequest.value.userName = loginRequest.value.userName.replace(regExp,'');
}
const CheckPasswordFromat = () => {
  const regExp = /[^\w]/g;
  loginRequest.value.password = loginRequest.value.password.replace(regExp,'');
}
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
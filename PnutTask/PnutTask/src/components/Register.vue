<template>
  <el-form class="register-form">
    <el-form-element class="login-title">
      <img class="logo-img" src="\public\BaseLogo.png" alt="\public\BaseLogo.png">
      <h1 class="text-2xl font-bold">PnutTask Register</h1>
    </el-form-element>
    <el-form-element>
      <el-input v-model="registerRequest.userName" placeholder="Username" :required="true" @input="CheckUserNameFromat()"/>
    </el-form-element>
    <el-form-element>
      <el-input v-model="registerRequest.password" placeholder="Password" :required="true" @input="CheckPasswordFromat()" :show-password="true"/>
    </el-form-element>
    <el-form-element class="login-button">
      <el-button @click="ProccedRegister()" type="primary" >Register</el-button>
      <el-button @click="GotoLogin" type="normal" >Login</el-button>
    </el-form-element>
  </el-form>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserInfo } from "@/composables/useUserInfo"
import { RegisterRequest } from "@/Models/Requests/RegisterRequest";
import { ref } from "vue";
import { BaseResponse } from "@/Models/BaseResponse";
import { useAlertStatusStore } from "@/stores/useAlertStatusStore";

const alertStatus = useAlertStatusStore();
const userInfo = useUserInfo();
const router = useRouter();
const GotoLogin = () => {
  router.push({ name: 'login'});
}
const registerRequest = ref<RegisterRequest>({
  userName: '',
  password: ''
});
const ProccedRegister = async () => {
  var registerResponse: BaseResponse = await userInfo.Register(registerRequest.value);
  if(registerResponse.errorCode !== 0){
    alertStatus.SetAlert('error', registerResponse.errorMessage);
  }else{
    alertStatus.SetAlert('success', registerResponse.errorMessage);
    GotoLogin();
  }
}
const CheckUserNameFromat = () => {
  const regExp = /[^\w]/g;
  registerRequest.value.userName = registerRequest.value.userName.replace(regExp,'');
}
const CheckPasswordFromat = () => {
  const regExp = /[^\w]/g;
  registerRequest.value.password = registerRequest.value.password.replace(regExp,'');
}
</script>

<style scoped>

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
  margin-bottom: 20px;
}
.login-button{
  margin-top: 20px;
}
</style>
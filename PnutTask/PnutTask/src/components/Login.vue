<template>
  <el-form class="register-form">
    <el-form-element class="login-title">
      <img class="logo-img" src="\public\BaseLogo.png" alt="\public\BaseLogo.png">
      <h1>PnutTask Login</h1>
    </el-form-element>
    <el-form-element>
      <el-input placeholder="Username" />
    </el-form-element>
    <el-form-element>
      <el-input placeholder="Password" />
    </el-form-element>
    <el-form-element class="login-button">
      <el-button type="primary" >Login</el-button>
    </el-form-element>
  </el-form>
</template>

<script lang="ts" setup>


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
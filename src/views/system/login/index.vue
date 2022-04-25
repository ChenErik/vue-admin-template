<template>
  <div class="login">
    <el-space
      class="login-form"
      direction="vertical"
      align="center"
    >
      <div class="login-form-title">
        <h1>登陆</h1>
      </div>
      <div class="login-form-content">
        <el-form
          ref="loginForm"
          style="width:365px;"
          :rules="rules"
          :model="loginInfo"
        >
          <el-form-item prop="userName">
            <el-input v-model="loginInfo.userName" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginInfo.password" :prefix-icon="View" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;" type="primary" @click="login(loginForm)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-form-footer">
        <p>cp</p>
      </div>
    </el-space>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import useLogin from '@/hook/useLogin'
import { User,View } from '@element-plus/icons-vue'
const { login, rules, loginInfo,loginForm } = useLogin()
</script>

<style lang="scss">
@import '@/styles/loginAni.scss';

.login{
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    background-size: 100% 100%;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    .el-form-item__label{
      color: #fff;
    }
    &-form{
        width: 500px;
        margin-left: 5%;
        position: relative;
        z-index: 2;
        &-title{
            img{
                width: 370px;
            }
            h1{
              color:var(--el-color-primary);
            }
        }
        &-content{
          margin-top: 40px;
          .acp-input{
            width: 380px;
          }
          .login_button{
            width: 380px;
          }
        }
        &-footer{
          p{
            font-size: 14px;
            color: #fff;
          }
        }
    }
}
</style>

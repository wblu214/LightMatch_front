<script setup lang="ts">
import {ref} from "vue";
import myAxios from "@/plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

    const router = useRouter();
    const userAccount = ref('');
    const userPassword = ref('');
/**
 * 登录
 */
const onSubmit = async () => {
      const  res = await myAxios.post('/user/login',
          {
        userAccount: userAccount.value,
        userPassword: userPassword.value
      })
      if (res.data.code === 20000) {
        await router.replace('/index');
        showSuccessToast("登录成功");
      } else {
        showFailToast(res.data.msg);
      }
    }
/**
 * 注册
 */
const register = () => {
      router.push('/register');
    }
/**
 * 修改密码
 */
const updatePassword = () => {

    }
</script>

<template>
  <div style="margin-bottom: 20px;text-align: center;font-size: 15px;font-weight: bold;color: #1989fa">
    用户登录
  </div>
  <div style="text-align: center">
    <van-icon name="fire-o" color="#ee0a24" m/>
  </div>

  <van-form @submit="onSubmit">
    <div style="text-align: center; margin-top: 40px">
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            name="userAccount"
            label="账号"
            placeholder="请填写账号"
            :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
            v-model="userPassword"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请填写密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
    </div>
    <div style="margin: 16px; margin-top: 40px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div style="margin-top: 20px; text-align: right;
     padding-right: 50px; color: #1989fa;text-decoration: underline;font-size: 15px" @click="register">
      注册
    </div>
    <div style="margin-top: 10px; text-align: right;
     padding-right: 40px; color: #1989fa;text-decoration: underline;font-size: 15px" @click="updatePassword">
      忘记密码?
    </div>
  </van-form>

</template>

<style scoped>

</style>
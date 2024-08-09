<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "@/plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";


const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');

// 提交
const onSubmit = async () => {
  // 提交表单数据
  const res = await myAxios.post("/user/register",{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
  });
  if (res.data.code === 20000) {
    showSuccessToast("注册成功,可在个人页补充信息");
  }else{
    showFailToast(res.data.msg);
  }
}
// 跳转到登录页
  const toLogin = () => {
    router.push(
        {
          path: '/',
          replace: true
    });
  }

</script>

<template>
  <div style="margin-bottom: 20px;text-align: center;font-size: 15px;font-weight: bold;color: #1989fa">
    用户注册
  </div>
  <div id="TeamAdd">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            name="name"
            label="用户名"
            placeholder="推荐[字母数字结合]"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="userPassword"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请填写密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="checkPassword"
            type="password"
            name="userPassword"
            label="二次密码"
            placeholder="请再次填写密码"
            :rules="[{ required: true, message: '请再次填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div style="margin-top: 10px; text-align: right;
     padding-right: 40px; color: #1989fa;text-decoration: underline;font-size: 15px" @click="toLogin">
      已有账号?去登录
    </div>
  </div>
</template>

<style scoped>

</style>
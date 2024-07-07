<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  username: '路文斌',
  userAccount: 'lwb214',
  avatarUrl: 'https://github.com/guofei9987/blind_watermark/blob/master/docs/%E6%89%93%E4%B8%8A%E6%B0%B4%E5%8D%B0%E7%9A%84%E5%9B%BE.jpg',
  gender: '男',
  phone: '123112312',
  email: '12345@qq.com',
  planetCode: '1234',
  createTime: new Date(),
}
const router = useRouter();
const toEdit = (editKey: string, editName: string,currentValue: string) => {
  router.push({
    path: 'user/edit',
    query:{
      editKey,
      editName,
      currentValue
    }
  })
}
</script>

<template>
  <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','昵称',user.username)"/>
  <van-cell title="账号" is-link :value="user.userAccount"/>
  <van-cell title="头像" is-link @click="toEdit('avatarUrl','头像',user.avatarUrl)">
    <img style="height: 40px;" :src="user.avatarUrl" alt="加载失败"/>
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
  <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
  <van-cell title="编号" is-link :value="user.planetCode"/>
  <van-cell title="注册时间" is-link :value="user.createTime.toDateString()"/>

</template>

<style scoped>

</style>
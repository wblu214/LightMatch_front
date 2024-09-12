<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, Ref, ref} from "vue";
import {getCurrentUser} from "@/service/user";

const user = ref();
const router = useRouter();

onMounted(async() => {
  user.value =  await getCurrentUser();
  getGender();
})
const getGender = ()=> {
  if(user.value.gender === 1) {
    user.value.gender = '男';
    console.log(user.value.gender);
  } else if(user.value.gender === 0) {
    user.value.gender = '女';
    console.log(user.value.gender);
  } else {
    user.value.gender = '未知';
    console.log(user.value.gender);
  }
};
const toEdit = (editKey: string, editName: string,currentValue: string) => {
  router.push({
    path: 'user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
};
const toEditImage = (editKey: string, editName: string, currentValue: string) => {
    router.push({
      path: 'user/image',
      query: {
        editKey,
        editName,
        currentValue
      }
  })
};

</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="头像" is-link @click="toEditImage('imageUrl','头像',user.imageUrl)">
      <img style="height: 40px;" :src="user.imageUrl" alt="加载失败"/>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="编号" is-link :value="user.code"/>
    <van-cell title="简介" is-link :value="user.profile" @click="toEdit('profile','简介',user.profile)"/>
    <van-cell title="注册时间" is-link :value="user.createTime"/>
  </template>
</template>

<style scoped>

</style>
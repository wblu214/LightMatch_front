<script setup>
import {onMounted, ref} from 'vue';
import myAxios from "@/plugins/myAxios.ts";
import UserCard from "@/components/UserCard.vue";
import {showFailToast, showSuccessToast} from "vant";

const userList = ref([]);

onMounted(async () => {
  const userListData =  await myAxios.get('/user/recommend')

      .then(function (response) {
        showSuccessToast('用户信息加载成功');
        console.log('user/searchByTags 请求成功', response)
        return response?.data?.data.records;
      })
      .catch(function (error) {
        showFailToast("用户信息加载失败")
        console.log('user/searchByTags 请求失败', error);
      })
  if(userListData){
    userListData.forEach( user => {
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

</script>

<template>
  <UserCard :user-list="userList" />
  <van-empty image="search" v-if="!userList || userList.length < 1" description="数据为空" />

</template>


<style scoped>

</style>
<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from 'vue';
import myAxios from "@/plugins/myAxios.js";
import qs from 'qs';
const router = useRouter();

const {tags} = router.currentRoute.value.query;
const userList = ref([]);

onMounted(async () => {
  const userListData =  await myAxios.get('/user/searchByTags', {
   params:{
     tagList: tags
   },
    paramsSerializer: params => {
      return qs.stringify(params, {indices:false})
    }
  })
      .then(function (response) {
        console.log('user/searchByTags 请求成功', response)
        return response.data?.data;
      })
      .catch(function (error) {
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
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.username"
      :thumb="user.imageUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 5px" >
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系Ta</van-button>
    </template>
  </van-card>

</template>


<style scoped>

</style>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "@/service/user";
import myAxios from "@/plugins/myAxios";

const user = ref();
const router = useRouter();

onMounted(async() => {
  user.value =  await getCurrentUser();
})

const loginOut = () => {
  myAxios.post('/user/logout');
  router.push('/');
}

</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" is-link to="/user" :value="user?.username" />
    <van-cell title="我创建的队伍" is-link to="/team/my/create"/>
    <van-cell title="我加入的队伍" is-link to="/team/my/join"/>
  </template>
  <div style="margin: 300px 16px 16px;">
    <van-button round block type="primary" native-type="submit" color="#ee0a24" @click="loginOut">
      退出登录
    </van-button>
  </div>
</template>

<style scoped>

</style>
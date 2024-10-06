<template>
    <div v-if="!$route.meta.showTabbar">
        <van-nav-bar title="雷电匹配" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <van-icon name="search" size="18" />
          </template>
        </van-nav-bar>
    </div>
        <div id="content">
          <router-view/>
        </div>
    <div v-if="!$route.meta.showTabbar">
        <van-tabbar route @change="onChange">
          <van-tabbar-item to="/index" icon="home-o" name="主页">主页</van-tabbar-item>
          <van-tabbar-item to="/team" icon="search" name="队伍">队伍</van-tabbar-item>
          <van-tabbar-item to="/user/me" icon="friends-o" name="个人">个人</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup>
import {showToast} from "vant";
import {ref} from 'vue'
import {useRouter} from "vue-router";
   const  router = useRouter();
   const onClickLeft = () => router.back();
   const onClickRight = () => {
     router.push('/search')
   }

   const active = ref("index");
   const onChange = (index) => showToast(`${index}`);
</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>
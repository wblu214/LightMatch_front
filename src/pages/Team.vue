<script setup>
  //跳转到加入队伍页面
  import {useRouter} from "vue-router";

  const router = useRouter();
  const doJoinTeam = () => {
    router.push({
      path: '/team/add'
    })
  }
</script>

<template>
  <div id="Team">
    <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
    <van-button type="primary">队伍2</van-button>
  </div>


</template>

<style scoped>
#Team {

}
</style>
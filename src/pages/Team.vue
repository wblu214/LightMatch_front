<script setup>
  //跳转到加入队伍页面
  import {useRouter} from "vue-router";
  import TeamCard from "@/components/TeamCard.vue";
  import myAxios from "@/plugins/myAxios";
  import {onMounted,ref} from "vue";
  import {showFailToast, showSuccessToast} from "vant";

  const router = useRouter();
  const doCreateTeam = () => {
    router.push({
      path: '/team/add'
    })
  }
  const teamList = ref([]);

  onMounted(async () => {
    const  res = await myAxios.get('/team/list');
    if (res.data.code === 20000) {
      teamList.value = res.data.data;
      showSuccessToast("队伍加载成功");
  } else {
      showFailToast("队伍加载失败，请刷新重试");
    }
})
</script>

<template>
  <div id="Team">
    <van-button type="primary" @click="doCreateTeam">创建队伍</van-button>
    <TeamCard :team-list="teamList" />
    <van-button type="primary">队伍2</van-button>
  </div>


</template>

<style scoped>
</style>
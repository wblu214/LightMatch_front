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
  const searchText = ref('');

  const listTeams = async (val='') => {
    const  res = await myAxios.get('/team/list',{
      params:{
        searchText:val,
        pageNum:1,
      }
    });
    if (res.data.code === 20000) {
      teamList.value = res.data.data;
      showSuccessToast("队伍加载成功");
    } else {
      showFailToast("队伍加载失败，请刷新重试");
    }
  }

  onMounted(async () => {
    await listTeams();
  })
  const onSearch = (val='') => {
   listTeams(val);
  }
</script>

<template>
  <div id="Team">
    <van-search
        v-model="searchText"
        shape="round"
        background='#4fc08d'
        placeholder="搜索队伍"
        @search="onSearch"
    />
    <van-button type="primary" @click="doCreateTeam">创建队伍</van-button>
    <TeamCard :team-list="teamList"/>
    <van-empty description="没有搜到相关的队伍" v-if="teamList?.length < 1" />
  </div>


</template>

<style scoped>
</style>
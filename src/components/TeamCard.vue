<script setup lang="ts">

  import {TeamType} from "@/models/team";
  import {teamStatusEnum} from "@/constants/teamStatus";
  import myAxios from "@/plugins/myAxios";
  import {showFailToast, showSuccessToast} from "vant";
  import {getCurrentUser} from "@/service/user";
  import {onMounted, ref} from "vue";
  import {useRouter} from "vue-router";

  interface TeamCard {
    teamList:TeamType[];
  }
  const props = defineProps<TeamCard>();

  /**
   * 加入队伍
   * @param id
   */
  const doJoinTeam = async (id:number) => {
    const res = await myAxios.post('/team/join', {
      teamId: id
    });
    if (res.data.code === 20000) {
      showSuccessToast("加入队伍成功");
    } else {
      showFailToast(res.data.msg);
    }
  }
  //拿到当前用户
  const currentUser = ref();
  onMounted(async() => {
    currentUser.value =  await getCurrentUser();
  })
  const router = useRouter();
  const updateTeam = async (id:number) => {
    await router.push({
      path: '/team/update',
      query: {
        id: id
      }
    })
  }
</script>

<template>
  <van-card
      v-for="team in teamList"
      :thumb="team.createUser.imageUrl"
      :desc="team.description"
      :title="team.name"
  >
    <template #tags>
      <van-tag plain type="primary" style="margin-right: 8px;margin-top: 5px" >
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ '最大人数:'+team.maxNum}}
      </div>
      <div>
        {{ '过期时间:'+team.expireTime}}
      </div>
    </template>
    <template #footer>
      <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" type="primary" plain @click="updateTeam(team.id)">更新队伍</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "@/plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import { TeamType } from "@/models/team";
import Team from "@/pages/Team.vue";


const router = useRouter();
const route = useRoute();

const showCalendar = ref(false);
const teamId = route.query.id;
const initFormData={
  "name": "",
  "description": "",
  "expireTime": null,
  "userId": 0,
  "status": 0,
  "password": ""
}
//用户填写的表单数据
const addTeamData = ref<TeamType>({});

/**
 * 获取当前队伍信息
 */
onMounted(async () => {
  const res = await myAxios.get("/team/get",{
    params:{
      id:teamId
    }
  });
  if (res.data.code === 20000){
    addTeamData.value = res.data.data;
  }else{
    showFailToast("获取当前队伍失败");
  }
});

/**
 * 选择日期
 * @param date
 */
const onConfirm = (date) => {
  addTeamData.value.expireTime = date.toLocaleString('zh').replaceAll('/', '-');
  showCalendar.value = false;
};
/**
 * 更新队伍
 */
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }

  console.log("更新请求", addTeamData.value);
  const res = await myAxios.post("/team/update",addTeamData.value);
     if (res.data.code === 20000) {
       showSuccessToast("更新队伍成功");
       await router.push({
         path: '/team',
         replace: true,
       });
     }else{
        showFailToast("更新队伍失败");
     }
}

</script>

<template>
<div id="TeamAdd">
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名"
          placeholder="请填写队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field
          v-model="addTeamData.description"
          rows="2"
          autosize
          label="队伍简介"
          type="textarea"
          placeholder="请输入队伍简介"
      />
      <van-field
          v-model="addTeamData.expireTime"
          is-link
          readonly
          name="calendar"
          label="过期时间"
          :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
          @click="showCalendar = true"
      />
      <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />

      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="addTeamData.status === '2'"
          v-model="addTeamData.password"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</div>
</template>

<style scoped>

</style>
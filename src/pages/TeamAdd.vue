<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "@/plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";


const router = useRouter();
const initFormData={
  "name": "",
  "description": "",
  "maxNum": 3,
  "expireTime": null,
  "userId": 0,
  "status": 0,
  "password": "",
  "imageUrl": "",
}
const showCalendar = ref(false);

const fileList = ref([]);
let imageUrl = "";
const afterRead = async (file) => {
  // 此时可以自行将文件上传至服务器
  fileList.value = [file];
  const formData = new FormData();
  formData.append('file', fileList.value[0].file);
  const imageMsg = await myAxios.post("/user/uploadImage", formData)
  imageUrl = imageMsg.data.data;
};

//用户填写的表单数据
const addTeamData = ref({...initFormData});
const onConfirm = (date) => {
  addTeamData.value.expireTime = date.toLocaleString('zh').replaceAll('/', '-');
  addTeamData.value.imageUrl = imageUrl;
  console.log("onConfirm", addTeamData.value);
  showCalendar.value = false;
};

// 提交
const onSubmit = async () => {
  console.log("onSubmit", addTeamData.value);
  // 提交表单数据
 const res = await myAxios.post("/team/create",addTeamData.value);
     if (res.data.code === 20000) {
       showSuccessToast("创建队伍成功");
       await router.push({
         path: '/team',
         replace: true,
       });
     }else{
        showFailToast(res.data.msg);
     }
}

</script>

<template>
<div id="TeamAdd">
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <div style="margin-left:120px;margin-top:20px">队伍头像</div>
      <div style="margin-left:110px;margin-top:20px">
        <van-uploader v-model="fileList" multiple :after-read="afterRead" :max-count="1" upload-text="点击这里上传"/>
      </div>
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

      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
        </template>
      </van-field>

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
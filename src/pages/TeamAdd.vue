<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";


const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);
const initFormData={
  "name": "",
  "description": "",
  "maxNum": 0,
  "expireTime": "",
  "userId": 0,
  "status": 0,
  "password": ""
}
const minDate = new Date();

//用户填写的表单数据
const addTeamData = ref({...initFormData});
</script>

<template>
<div id="TeamAdd">
  <van-form @submit="">
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
          is-link
          readonly
          name="datetimePicker"
          label="过期时间"
          :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-datetime-picker
            v-model="addTeamData.expireTime"
            @confirm="showPicker = false"
            type="datetime"
            title="请选择过期时间"
            :min-date="minDate"
        />
      </van-popup>

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
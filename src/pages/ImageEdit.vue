<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "@/plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "@/service/user";

const route = useRoute();
const router = useRouter();
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

const fileList = ref([]);
let imageUrl = editUser.value.currentValue;
const afterRead = async (file) => {0
  // 此时可以自行将文件上传至服务器
  fileList.value = [file];
};

const onSubmit =  async () => {
  const currentUser =  await getCurrentUser();
  if(!currentUser) {
    showFailToast("请先登录");
    return;
  }

  const formData = new FormData();
  formData.append('file', fileList.value[0].file);
  const imageMsg = await myAxios.post("/user/uploadImage", formData)
  imageUrl = imageMsg.data.data;
  const res = await myAxios.post("/user/update", {
    "id":currentUser.id,
    [editUser.value.editKey]: imageUrl
  })
  console.log("更新请求")
  if(res.data.code === 20000) {
    showSuccessToast("更新成功")
    router.back();
  }else{
    showFailToast(res.data.msg);
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <div style="margin-left:120px;margin-top:20px">图片上传</div>
    <div style="margin-left:110px;margin-top:20px">
    <van-uploader v-model="fileList" multiple :after-read="afterRead" :max-count="1" upload-text="点击这里上传"/>
    </div>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>
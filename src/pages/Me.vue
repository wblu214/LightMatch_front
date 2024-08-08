<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "@/service/user";

const user = ref();


const router = useRouter();

onMounted(async() => {
  user.value =  await getCurrentUser();
})

</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" is-link to="/user" :value="user?.username" />
    <van-cell title="我创建的队伍" is-link to="/team/my/create"/>
    <van-cell title="我加入的队伍" is-link to="/team/my/join"/>
  </template>
</template>

<style scoped>

</style>
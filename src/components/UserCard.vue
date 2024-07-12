<script setup lang="ts">
  import {UserType} from "@/models/user";

  interface UserCard {
    userList:UserType[];
  }
  const props = defineProps<UserCard>();
</script>

<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.username"
      :thumb="user.imageUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 5px" >
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系Ta</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>
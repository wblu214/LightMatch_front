<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
const originTagList = [
  {
    text: '方向',
    children: [
      { text: 'java', id: 'java' },
      { text: 'python', id: 'python' },
      { text: 'c++', id: 'c++' },
    ],
  },
  {
    text: '性别',
    children: [
      { text: '男', id: '男'},
      { text: '女', id: '女'},
    ],
  },
  {
    text: '学历',
    children: [
      { text: '专科', id: 'c++'},
      { text: '本科', id: '本科'},
      { text: '硕士', id: '硕士'},
    ],
  },
];

//标签列表
let tagList = ref(originTagList);
    const searchText = ref('');
/**
 * 搜索过滤
 * @param val val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
}
/**
 * 取消搜索
 */
const onCancel = () => {
      searchText.value = '';
      onSearch();
    }
    //已选中的标签
    const activeIds = ref([]);
    const activeIndex = ref(0);
//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}
const router = useRouter();
const  doSearchResult = () =>{
  router.push({
    path: 'user/list',
    query:{
      tags: activeIds.value,
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider>已选标签</van-divider>
  <div v-if="activeIds.length===0">请选择标签</div>
  <van-row gutter="10" style="padding: 0 16px;">
    <van-col v-for="tag in activeIds">
      <van-tag  closeable size="medium" type="primary" @close="doClose(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider>待选标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
<div style="padding: 20px">
  <van-button type="primary" block @click="doSearchResult">搜索</van-button>
</div>
</template>


<style scoped>

</style>
<script setup>
import { ref } from 'vue';
const originTagList = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: '杭州' },
      { text: '温州', id: '温州' },
      { text: '宁波', id: '宁波', disabled: true },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: '南京'},
      { text: '无锡', id: '无锡'},
      { text: '徐州', id:'徐州' },
    ],
  },
  {
    text: '宁夏',
    children: [
      { text: '固原', id: '固原'},
      { text: '银川', id: '银川'},
      { text: '吴忠', id: '吴忠'},
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
</template>


<style scoped>

</style>
<template>
  <div>
    <a-input-search class="menu-search-input" v-model:value="searchValue" placeholder="Search"/>
    <a-tree class="draggable-tree" block-node :tree-data="gData" :expanded-keys="expandedKeys"
            :fieldNames="{title: 'name', key: 'path'}" @select="onSelect" :auto-expand-parent="autoExpandParent"
            @expand="onExpand">
      <template #title="{ name }">
        <span v-if="name.indexOf(searchValue) > -1">
          {{ name.substr(0, name.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ name.substr(name.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ name }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";

// eslint-disable-next-line
const props = defineProps({
  directory: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(["onClick"]);

const dataList = [];

const gData = ref([]);

onMounted(() => {
  gData.value = props.directory;
  dataList.length = 0;
  generateList(gData.value);
  console.log("gData", gData.value);
  console.log("dataList", dataList);
});

watch(props.directory, (newVal) => {
  gData.value = newVal;
  dataList.length = 0;
  generateList(gData.value);
});

const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    dataList.push({path: node.path, name: node.name});
    if (node.children) {
      generateList(node.children);
    }
  }
};

const expandedKeys = ref([]);
const searchValue = ref("");
const autoExpandParent = ref(true);

const onExpand = keys => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

watch(searchValue, value => {
  // 匹配内容并获取需要展开的节点
  expandedKeys.value = dataList
    .map(item => {
      if (item.name.indexOf(value) > -1) {
        return getParentKey(item.path, gData.value);
      }
      return null;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
  searchValue.value = value;
  autoExpandParent.value = true;
});

const getParentKey = (path, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.path === path)) {
        parentKey = node.path;
      } else if (getParentKey(path, node.children)) {
        parentKey = getParentKey(path, node.children);
      }
    }
  }
  return parentKey;
};

const onSelect = (selectedKeys, info) => {
  console.log("selected", selectedKeys, info);
  emits("onClick", info.node);
};

</script>

<style lang="less" scoped>
.menu-search-input {
  width: 100%;
  margin-bottom: 8px;
}
</style>

<template>
  <div>
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search"/>
    <a-tree class="draggable-tree" draggable block-node :tree-data="props.directory"
            :fieldNames="{title: 'name', key: 'path'}" @select="onSelect"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

// eslint-disable-next-line
const props = defineProps({
  directory: {
    type: Array,
    default: () => []
  }
});

// eslint-disable-next-line
const emits = defineEmits(["onClick"]);

const searchValue = ref<string>("");

const onSelect = (selectedKeys: any, info: any) => {
  console.log("selected", selectedKeys, info);
  emits("onClick", info.node);
};

</script>

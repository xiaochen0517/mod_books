<template>
  <div>
    <a-input-search v-model="searchValue" style="margin-bottom: 8px" placeholder="Search"/>
    <a-tree class="draggable-tree" draggable block-node :tree-data="props.directory"
            :fieldNames="{title: 'name', key: 'path'}" @select="onSelect"/>
  </div>
</template>

<script setup>
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

const searchValue = ref("");

const onSelect = (selectedKeys, info) => {
  console.log("selected", selectedKeys, info);
  emits("onClick", info.node);
};

</script>

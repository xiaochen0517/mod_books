<template>
  <div class="home-view">
    <div class="top-header flex-row flex-ai-center">
      <a-button @click="switchTheme">切换主题</a-button>
    </div>
    <div class="flex-row">
      <div class="directory-list">
        <directory-block @onClick="directoryClickHandle"/>
      </div>
      <div class="md-content-box flex-row">
        <MdPreview class="preview-box"
                   editorId="preview-only"
                   :modelValue="text"
                   :theme="configTheme"
                   :previewTheme="mdTheme.previewTheme"
                   :codeTheme="mdTheme.codeTheme"/>
        <MdCatalog class="catalog-box primary-text-color" editorId="preview-only"
                   :scrollElement="scrollElement"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import DirectoryBlock from "@/components/directory/DirectoryBlock.vue";
import axios from "@/plugins/axios";
import {MdPreview, MdCatalog} from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import router from "@/router";

const scrollElement = document.documentElement;
const mdTheme = reactive({
  previewTheme: "github",
  codeTheme: "atom",
});

const store = useStore();

const text = ref("# Hello World");

const pageMainPath = computed(() => store.state.ConfigStore.pagesConfig.main_path);

const mdFilePath = computed(() => router.currentRoute.value.params.mdPath);

onMounted(() => {
  // 获取链接中的参数
  console.log("router", mdFilePath);
  initMdContent();
});

watch(mdFilePath, () => {
  initMdContent();
});

const initMdContent = () => {
  if (mdFilePath.value && typeof mdFilePath.value === "string") {
    if (pageMainPath.value) {
      getMdFile(mdFilePath.value);
    } else {
      setTimeout(() => {
        initMdContent();
      }, 500);
    }
  }
};

const getMdFile = (path) => {
  // 将path中被转义的/转回来
  path = path.replace(/%2F/g, "/");
  console.log("load md file", path);
  axios.get(`/${pageMainPath.value}/${path}`).then(res => {
    text.value = res.data;
  });
};

const directoryClickHandle = (item) => {
  // 对path中的/进行转义
  item.path = item.path.replace(/\//g, "%2F");
  router.push({path: `/home/${item.path}`});
};

const configTheme = computed(() => store.state.ConfigStore.settings.theme);
const switchTheme = () => {
  switch (configTheme.value) {
    case "light":
      store.commit("setTheme", "dark");
      break;
    case "dark":
      store.commit("setTheme", "light");
      break;
    default:
  }
};
</script>

<style scoped lang="less">
.home-view {
  .directory-list {
    flex: 1;
    box-sizing: border-box;
    padding: 10px;
  }

  .md-content-box {
    flex: 3;
    box-sizing: border-box;
    padding: 10px;

    .preview-box {
      flex: 4;
      box-sizing: border-box;
      background-color: transparent;
    }

    .catalog-box {
      flex: 1;
      box-sizing: border-box;
    }
  }
}
</style>

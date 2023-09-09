<template>
  <div class="home-view">
    <div class="top-header">
      <a-button @click="switchTheme">切换主题</a-button>
    </div>
    <div class="flex-row">
      <div class="directory-list">
        <directory-block :directory="configPages.pages" @onClick="directoryClickHandle"/>
      </div>
      <div class="md-content-box flex-row">
        <MdPreview class="preview-box"
                   editorId="preview-only"
                   :modelValue="text"
                   :theme="configTheme"
                   :previewTheme="mdTheme.previewTheme"
                   :codeTheme="mdTheme.codeTheme"/>
        <MdCatalog class="catalog-box" editorId="preview-only" :scrollElement="scrollElement"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed, onMounted, reactive, ref} from "vue";
  import {useStore} from "vuex";
  import DirectoryBlock from "@/components/directory/DirectoryBlock.vue";
  import axios from "@/plugins/axios";
  import {MdPreview, MdCatalog} from 'md-editor-v3';
  import 'md-editor-v3/lib/preview.css';

  const scrollElement = document.documentElement;
  const mdTheme = reactive({
    previewTheme: 'github',
    codeTheme: 'atom',
  });

  const store = useStore();

  const text = ref<string>("# Hello World");
  const configPages = ref<any>({pages: []});

  onMounted(() => {
    // 获取pages配置
    configPages.value = store.getters.getPagesConfig;
  });

  const directoryClickHandle = (item: any) => {
    console.log('directoryClickhandle', item);
    let mdFilePath = item.path;
    axios.get(`/${configPages.value.main_path}/${mdFilePath}`).then(res => {
      text.value = res.data;
    })
  }

  const configTheme = computed(() => store.state.ConfigStore.settings.theme);
  const switchTheme = () => {
    if (configTheme.value === "light") {
      store.commit("setSettings", {...store.state.ConfigStore.settings, theme: "dark"});
    } else {
      store.commit("setSettings", {...store.state.ConfigStore.settings, theme: "light"});
    }
  }
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
      }

      .catalog-box {
        flex: 1;
        box-sizing: border-box;
      }
    }
  }
</style>

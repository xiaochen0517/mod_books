<template>
  <div class="home-view flex-row">
    <div class="directory-list">
      <directory-block :directory="configPages.pages" @onClick="directoryClickhandle"/>
    </div>
    <div class="md-content-box flex-row">
      <MdPreview class="preview-box"
                 editorId="preview-only"
                 :modelValue="text"
                 theme="dark"
                 :previewTheme="mdTheme.previewTheme"
                 :codeTheme="mdTheme.codeTheme"/>
      <MdCatalog class="catalog-box" editorId="preview-only" :scrollElement="scrollElement"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, reactive, ref} from "vue";
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
    console.log(configPages.value)
  });

  const directoryClickhandle = (item: any) => {
    console.log('directoryClickhandle', item);
    let mdFilePath = item.path;
    axios.get(`/${configPages.value.main_path}/${mdFilePath}`).then(res => {
      text.value = res.data;
    })
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

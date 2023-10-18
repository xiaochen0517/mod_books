<template>
  <div class="home-view">
    <div class="top-header">
      <top-bar/>
    </div>
    <div class="flex-row">
      <div class="directory-list">
        <directory-block @onClick="directoryClickHandle"/>
      </div>
      <div class="md-content-box flex-row">
        <MdPreview ref="MdPreviewRefs"
                   class="preview-box"
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
import {computed, nextTick, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import DirectoryBlock from "@/components/directory/DirectoryBlock.vue";
import axios from "@/plugins/axios";
import {MdCatalog, MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

import router from "@/router";
import TopBar from "@/components/layout/TopBar.vue";

const scrollElement = document.documentElement;
const mdTheme = reactive({
  previewTheme: "github",
  codeTheme: "atom",
});

const store = useStore();

const text = ref("");

const configTheme = computed(() => store.state.ConfigStore.settings.theme);

const pageMainPath = computed(() => store.state.ConfigStore.pagesConfig.main_path);

const mdFilePath = computed(() => router.currentRoute.value.params.mdPath);

const MdPreviewRefs = ref(null);

onMounted(() => {
  // 获取链接中的参数
  console.log("router", mdFilePath);
  initMdContent();
});

watch(mdFilePath, () => {
  initMdContent();
});

const changeLinksClickEvent = () => {
  // 配置点击事件
  const links = MdPreviewRefs.value.$el.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      // 阻止默认点击事件
      event.preventDefault();
      // 获取跳转的地址
      const href = this.getAttribute("href");
      // 在这里处理跳转的地址
      console.log(href);
      // 判断跳转的地址是否是外部地址
      if (isExternalLink(href)) {
        // 对href进行编码
        const encodeHref = encodeURIComponent(href);
        console.log("encode href", encodeHref);
        // 打开一个新的窗口
        window.open(`/#/external/${encodeHref}`);
      } else {
        // 跳转到指定的地址
        // router.push({path: `/home/${href}`});
      }
    });
  }
};
const isExternalLink = (url) => {
  const pattern = /^https?:\/\//i;
  return pattern.test(url);
};

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
  axios.get(`/${pageMainPath.value}/${path}`).then(res => {
    text.value = res.data;
    setTimeout(() => {
      nextTick(() => {
        changeLinksClickEvent();
      });
    }, 500);
  });
};

const directoryClickHandle = (item) => {
  router.push({path: `/home/${item.path}`});
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
    flex: 5;
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

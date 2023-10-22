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
      event.preventDefault();
      const href = this.getAttribute("href");
      if (isExternalLink(href)) {
        const encodeHref = encodeURIComponent(href);
        console.log("encode href", encodeHref);
        window.open(`/#/external/${encodeHref}`);
      } else {
        router.push({path: `/home/${href}`});
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

<template>
  <div>
    <top-bar/>
    <div class="flex flex-row">
      <div class="flex-1 box-border p-2">
        <directory-block @onClick="directoryClickHandle"/>
      </div>
      <div class="flex flex-row flex-[5] box-border p-2">
        <MdPreview ref="MdPreviewRefs"
                   class="flex-1 box-border"
                   editorId="preview-only"
                   :modelValue="text"
                   :theme="configTheme"
                   :previewTheme="mdTheme.previewTheme"
                   :codeTheme="mdTheme.codeTheme"
                   style="background-color: transparent;"/>
        <div class="w-1/5 h-auto">
          <MdCatalog class="primary-text-color box-border sticky top-2" editorId="preview-only"
                     :scrollElement="scrollElement"/>
        </div>
      </div>
    </div>
  </div>
</template>

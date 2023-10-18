import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // 在开发模式下，将 docs 目录作为静态资源提供
    watch: {
      include: './src/docs/**'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve("src/assets/styles/variables.less")}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [vue()],
});

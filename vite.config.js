import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [vue(),
  styleImport({
    resolves: [VantResolve()],
    libs: [
      {
        libraryName: "vant",
        esModule: true,
        resolveStyle: (name) => `../es/${name}/style`
      },
    ],
  }),
  ],
  server: {
    host: '0.0.0.0',
    port: 9001,
    // 是否开启 https
    https: false,
    // proxy: {
    //   '/api': {
    //     target: 'https://api.vvhan.com/api',	//实际请求地址
    //     ws: true,//代理websocked
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //打包添加
  base:'./'
})



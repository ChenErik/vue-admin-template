/* eslint-disable import/no-unresolved */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${pathSrc}/`
    }
  },
  server: {
    open: true,
    host: true,
    port: 9527,
    // Load proxy configuration from .env
    // proxy: {},
    proxy: {
      '/api': {
        ws:false,
        target:'https://idp-test.joyea.cn/svrhmi/',
        changeOrigin:true
      },
      '/confmsg':{
        ws:true,
        target:'http://192.168.0.65:8099',
        changeOrigin:true
      }
    },
  },
  plugins: [
    vue(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'types/components.d.ts'
    }),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 执行icon name的格式
      symbolId: 'icon-[dir]-[name]',
    }),
    vueSetupExtend()
  ]
})

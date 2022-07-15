import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElMessage } from 'element-plus'
import App from './App.vue'
import { router } from './router/'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import './permission'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
window.onerror = (msg) => {
  /**
     * You can safely ignore this error.
     * This error means that ResizeObserver was not able to deliver all observations within a single animation frame.
     * It is benign (your site will not break)
     * https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
     */
  if (msg !== 'ResizeObserver loop limit exceeded')
    ElMessage.error(msg as string)
}
const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router)
app.use(createPinia())
app.mount('#app')

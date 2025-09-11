import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'

const app = createApp(App)

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 配置axios
axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$http = axios

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 初始化用户状态
const userStore = useUserStore()
userStore.restoreLoginState()

app.mount('#app')

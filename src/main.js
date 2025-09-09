import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入全局样式
import './assets/styles/reset.css'
// 导入Bootstrap图标库
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

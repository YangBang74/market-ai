import { createApp } from 'vue'
import '@/shared/assets/styles/style.css'
import App from './app/App.vue'
import { router } from './app/routing/router'

createApp(App).use(router).mount('#app')

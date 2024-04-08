import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

// Vue-Router
import router from './plugins/router'

// Pinia
import pinia from '@/plugins/pinia'

createApp(App).use(vuetify).use(router).use(pinia).mount('#app')

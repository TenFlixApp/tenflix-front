import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

// Vue-Router
import router from './plugins/router'


createApp(App).use(vuetify).use(router).mount('#app')
  
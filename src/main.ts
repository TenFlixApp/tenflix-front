import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

// Vue-Router
import router from './plugins/router'

// Vue-Toastify
import Vue3Toastify from 'vue3-toastify'
import options from '@/plugins/toastify'

// Pinia
import pinia from '@/plugins/pinia'

// videojs-hotkeys
import "videojs-hotkeys"

// ApexCharts
import VueApexCharts from "vue3-apexcharts";

createApp(App).use(vuetify).use(router).use(Vue3Toastify, options).use(pinia).use(VueApexCharts).mount('#app')

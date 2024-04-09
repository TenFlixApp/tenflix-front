import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const dialogType = ref("")
    const accessToken = ref("")
    const refreshToken = ref("")

    return { dialogType, accessToken, refreshToken }
}, {
    persist: {
        enabled: true,
        strategies: [
          {
            storage: localStorage,
            key: 'tenflix_auth',
            paths: ['accessToken', 'refreshToken']
          }
        ]
      }
})
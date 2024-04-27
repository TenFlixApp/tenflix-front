import { createWebHistory, createRouter } from 'vue-router'
import AuthService from "@/services/Auth"
import routes from "@/pages"
import vuetify from './vuetify';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

const authService = new AuthService();

router.beforeResolve((to, from, next) => {
    if (to.name === '' && authService.isConnected()) {
        if (!from?.name || from.name?.toString() === "") {
            next({ name: "home" })
        }
    } else {
        next()
    }
})

router.beforeResolve((to, _, next) => {
    if (!to.meta.public && !authService.isConnected()) {
        next({ name: ''})
    } else {
        next()
    }
})

router.beforeResolve((to, _, next) => {
    if (to.meta.reservedMobile && !vuetify.display.mobile.value) {
        next({ name: '' })
    } else {
        next()
    }
})

export default router;
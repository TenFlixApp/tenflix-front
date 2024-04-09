import { createWebHistory, createRouter, Router } from 'vue-router'
import AuthService from "@/services/Auth"
import routes from "@/pages"

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

const authService = new AuthService();

// redirection si accès a page de connexion alors que connecté
router.beforeResolve((to, from, next) => {
    if (to.name === '' && authService.isConnected()) {
        if (!from?.name || from.name?.toString() === "") {
            next({ name: "home" })
        }
    } else {
        next()
    }
})

// redirection vers page de connexion si pas connecté
router.beforeResolve((to, _, next) => {
    if (!to.meta.public && !authService.isConnected()) {
        next({ name: ''})
    } else {
        next()
    }
})

export default router;
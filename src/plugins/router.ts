import { createWebHistory, createRouter, Router } from 'vue-router'
import AuthService from "@/services/Auth"
import routes from "@/pages"
import vuetify from './vuetify';
import { Rights } from '@/constants/Rights';

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

router.beforeResolve((to, from, next) => {
    if (to.meta.rights) {
        const authorized = authService.hasRights(to.meta.rights as Rights)
        if (!authorized) {
            if (from && from.name) {
                next({ name: from.name.toString() })
            } else {
                next({ name: '' })
            }
        } else {
            next()
        }
    } else {
        next()
    }
});

router.beforeResolve((to, _, next) => {
    if (to.meta.reservedMobile && !vuetify.display.mobile.value) {
        next({ name: '' })
    } else {
        next()
    }
})

export default router;
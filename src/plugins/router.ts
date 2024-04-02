import { createWebHistory, createRouter, Router } from 'vue-router'
import routes from "@/pages"

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, _, next) => {
    // const { isAuthenticated } = useAuthStore()
    const isPublic = to.meta.public === true;

    
})

export default router;
import { createWebHistory, createRouter, Router } from 'vue-router'
import routes from "@/pages"
// import AuthService from "@/services/Auth"
// import { Rights } from '@/constants/Rights'

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

// const authService = new AuthService();

// router.beforeEach((to, _, next) => {
//     // const { isAuthenticated } = useAuthStore()
//     const isPublic = to.meta.public === true;

//     // if (!isPublic) {
//     //     authService.isConnected()
//     //         .then((response) => {
                
//     //         })
//     // }
    
// })

export default router;
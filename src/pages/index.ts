import { RouteRecordRaw } from "vue-router";
import AuthService from "@/services/Auth"

const authService = new AuthService();

const routes: RouteRecordRaw[] = [
    { 
        name: 'home', 
        path: '/home',
        component: () => {
            if (authService.isConnected()) {
                return import("./HomePage.vue")
            } else {
                return import("./HomeNCPage.vue")
            }
        },
        meta: {
            public: true
        }
    },
    { 
        name: 'about', 
        path: '/about',
        component: () => import("./AboutPage.vue"),
        meta: {
            droits: ["DROIT1"]
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/home'
    }
];

export default routes;
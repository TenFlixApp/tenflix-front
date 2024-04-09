import { RouteRecordRaw } from "vue-router";
import AuthService from "@/services/Auth"

const authService = new AuthService();

const routes: RouteRecordRaw[] = [
    { 
        name: 'home', 
        path: '/home',
        component: () => import("./HomePage.vue")
    },
    {
        name: '',
        path: '/',
        component: () => import("./HomeNCPage.vue"),
        meta: {
            public: true
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: () => "/home"
    }
];

export default routes;
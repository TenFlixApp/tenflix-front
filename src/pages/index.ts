import { RouteRecordRaw } from "vue-router";

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
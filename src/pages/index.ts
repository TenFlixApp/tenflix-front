import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    { 
        name: 'home', 
        path: '/', 
        component: () => import("./HomePage.vue"),
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
    }
];

export default routes;
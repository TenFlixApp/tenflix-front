import { Rights } from "@/constants/Rights";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    { 
        name: 'home', 
        path: '/home',
        component: () => import("./HomePage.vue")
    },
    {
        name: 'search',
        path: '/search/:search',
        component: () => import("./SearchPage.vue")
    },
    {
        name: 'playlists',
        path: '/playlists',
        component: () => import("./PlaylistPage.vue")
    },
    {
        name: 'abonnements',
        path: '/abonnements',
        component: () => import("./AbonnementsPage.vue")
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import("./DashboardPage.vue"),
        meta: {
            rights: Rights.SUPER_USER
        }
    },
    {
        name: 'gestion-comptes',
        path: '/gestion-comptes',
        component: () => import("./GestionComptePage.vue"),
        meta: {
            rights: Rights.ADMIN
        }
    },
    {
        name: 'menu',
        path: '/menu',
        component: () => import("./MenuMobilePage.vue"),
        meta: {
            reservedMobile: true
        }
    },
    {
        name: 'account',
        path: '/account',
        component: () => import("./AccountPage.vue")
    },
    {
        name: 'channel',
        path: '/channel/:id',
        component: () => import("./ChannelPage.vue")
    },
    {
        name: 'upload',
        path: '/upload',
        component: () => import("./UploadPage.vue")
    },
    {
        name: 'media',
        path: '/media/:id',
        component: () => import("./MediaPage.vue")
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
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/Auth';

const router = useRouter();

const authService = new AuthService();

interface Bouton {
    titre: string;
    routeName: string;
    perm: string;
}

interface BoutonsMenu {
    titre: string;
    function: () => void;
    icone: string;
}

interface Notif {
    avatar: string;
    title: string;
    sub: string;
}
const boutons = ref<Bouton[]>([
    { titre: "Acceuil", routeName: "home", perm: "all" },
    { titre: "Playlist", routeName: "playlists", perm: "all" },
    { titre: "Abonnements", routeName: "abonnements", perm: "all" },
    { titre: "Dashboard", routeName: "dashboard", perm: "admin" },
    { titre: "Gestion comptes", routeName: "gestion-comptes", perm: "admin" }
]);

const menuBoutons = ref<BoutonsMenu[]>([
    { titre: "Votre compte", function: () => { router.push({ name: 'account' }) }, icone: "mdi-account" },
    { titre: "Mettre en ligne", function: () => { router.push({ name: 'upload' }) }, icone: "mdi-upload" },
    {
        titre: "Se déconnecter",
        function: () => {
            authService.logout(); location.reload();
        },
        icone: "mdi-logout"
    },
])

const notifs = ref<Notif[]>([
    { avatar: "https://cdn.vuetifyjs.com/images/john.jpg", title: "John Leider", sub: "Founder of Vuetify" },
    { avatar: "https://cdn.vuetifyjs.com/images/john.jpg", title: "titre 2", sub: "description" }
]);
const searchShowed = ref<boolean>(false);
const search = ref<string>("")
const menunotif = ref<boolean>(false);
const menucompte = ref<boolean>(false);
const logoPath = ref('/assets/logo.png');
</script>

<template>
    <v-app-bar :elevation="2" rounded>
        <img class="mr-3" :src="logoPath" height="40" />

        <v-btn v-for="bouton in boutons" variant="plain" color="accent"
            @click="router.push({ name: bouton.routeName })">{{ bouton.titre }}</v-btn>

        <v-spacer />

        <v-expand-transition>
            <v-form @submit.prevent="router.push({ name: 'search', params: { search: search } })" v-if="searchShowed"
                class="w-25">
                <v-text-field v-model="search" hide-details label="Recherche" />
            </v-form>
        </v-expand-transition>

        <v-btn variant="plain" icon="mdi-magnify" @click="searchShowed = !searchShowed" />
        <v-menu v-model="menunotif" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="plain" icon="mdi-bell" />
            </template>
            <v-card min-width="300">
                <v-list>
                    <v-list-item v-for="notif in notifs" :prepend-avatar="notif.avatar" :sub="notif.sub"
                        :title="notif.title" />
                </v-list>
            </v-card>
        </v-menu>
        <v-menu v-model="menucompte" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="plain" icon="mdi-account" />
            </template>
            <v-card min-width="300">
                <v-list>
                    <v-list-item v-for="button in menuBoutons">
                        <v-btn variant="plain" color="bar" :prepend-icon="button.icone" @click="button.function">
                            {{ button.titre }}
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

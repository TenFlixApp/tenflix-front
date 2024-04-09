<script setup lang="ts">
import { ref } from 'vue';

interface Bouton {
    titre: string;
    link: string;
    perm: string;
}

interface Notif {
    avatar: string;
    title: string;
    sub: string;
}
const boutons = ref<Bouton[]>([
    { titre: "Acceuil", link: "/" , perm: "all" },
    { titre: "Recherche", link: "/recherche" , perm: "all" },
    { titre: "Playlist", link: "/playlist" , perm: "all" },
    { titre: "Abonnements", link: "/abonnements" , perm: "all" },
    { titre: "Dashboard", link: "/dashboard" , perm: "admin" },
    { titre: "Gestion comptes", link: "/gestion-comptes" , perm: "admin" }
]);
const notifs = ref<Notif[]>([
    { avatar: "https://cdn.vuetifyjs.com/images/john.jpg", title: "John Leider", sub: "Founder of Vuetify" },
    { avatar: "https://cdn.vuetifyjs.com/images/john.jpg", title: "titre 2", sub: "description" }
]);
const searchShowed = ref<boolean>(false);
const menunotif = ref<boolean>(false);
const menucompte = ref<boolean>(false);
const logoPath = ref('/assets/logo.png');
</script>

<template>
    <v-app-bar :elevation="2" rounded>
        <img class="mr-3" :src="logoPath" height="40"/>

        <v-btn v-for="bouton in boutons" variant="plain" color="accent" >{{ bouton.titre }}</v-btn>
        
        <v-spacer />
          
        <v-expand-transition>
            <v-text-field hide-details label="Recherche" v-if="searchShowed" />
        </v-expand-transition>      

                <v-btn variant="plain" icon="mdi-magnify" @click="searchShowed = !searchShowed" />
                <v-menu v-model="menunotif" :close-on-content-click="false" >
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="plain" icon="mdi-bell" />
                    </template>
                    <v-card min-width="300">
                        <v-list>
                            <v-list-item
                                v-for="notif in notifs"
                                :prepend-avatar="notif.avatar"
                                :sub="notif.sub"
                                :title="notif.title" />
                        </v-list>
                    </v-card>
                </v-menu>
                <v-menu v-model="menucompte" :close-on-content-click="false" >
                    <template v-slot:activator="{ props  }">
                        <v-btn v-bind="props" variant="plain" icon="mdi-account" />
                    </template>
                    <v-card min-width="300">
                        <v-list>
                            <v-list-item><v-btn variant="plain" color="bar" prepend-icon="mdi-cog">Paramétre</v-btn></v-list-item>
                            <v-list-item><v-btn variant="plain" color="bar" prepend-icon="mdi-account">Compte</v-btn></v-list-item>
                            <v-list-item><v-btn variant="plain" color="bar" prepend-icon="mdi-upload">Mettre en ligne</v-btn></v-list-item>
                            <v-list-item><v-btn variant="plain" color="bar" prepend-icon="mdi-logout">Se déconnecter</v-btn></v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
    </v-app-bar>
</template>
  
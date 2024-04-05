<script setup lang="ts">
    import { ref } from 'vue';
    // Définition du type pour les Boutons et commandes
    interface Bouton {
    titre: string;
    link: string;
    perm: string;
    }
    // Définition des notifs
    interface Notif {
    titre: string;
    chaine: string;
    video: string;
    }

    const notifs = ref<Notif[]>([
        { titre: "Nouvelle video1", chaine: "chaine1", video: "https://cdn.vuetifyjs.com/images/john.jpg" },
        { titre: "Nouvelle video2", chaine: "chaine2", video: "Titre de la video" },
        { titre: "Nouvelle video3", chaine: "chaine3", video: "Titre de la video" }
    ]);

    // Utilisation de 'ref' pour la réactivité. Vous pouvez aussi utiliser 'reactive' pour des objets complexes.
    const boutons = ref<Bouton[]>([
        { titre: "Acceuil", link: "/" , perm: "all" },
        { titre: "Recherche", link: "/recherche" , perm: "all" },
        { titre: "Playlist", link: "/playlist" , perm: "all" },
        { titre: "Abonnements", link: "/abonnements" , perm: "all" },
        { titre: "Dashboard", link: "/dashboard" , perm: "admin" },
        { titre: "Gestion comptes", link: "/gestion-comptes" , perm: "admin" }
    ]);
    
    const commandes = ref<Bouton[]>([]);
    const searchShowed = ref<boolean>(false);
    const menunotif = ref<boolean>(false);
    const menucompte = ref<boolean>(false);
    const logoPath = ref(' /assets/logo.png');


    // Méthode pour ajouter un Bouton aux commandes
    function commander(bouton: Bouton) {
        commandes.value.push(bouton);
    }
</script>

<template>
    <v-app-bar :elevation="2" rounded>
        <!-- Contenu à gauche -->
            <img class="mr-3" :src="logoPath" height="40"/>

            
            <!-- Itération sur chaque bouton pour créer un bouton par bouton -->
                <div v-for="bouton in boutons" :key="bouton.titre">
                    <!-- Correction de la méthode commander appelée avec l'objet bouton -->
                    <v-btn variant="plain" color="bar" @click="commander(bouton)">{{ bouton.titre }}</v-btn>
                </div>
        
        <v-spacer></v-spacer>

        <!-- Contenu à droite -->
          
            <v-expand-transition>
                <v-text-field label="Recherche" v-if="searchShowed" ></v-text-field>
            </v-expand-transition>      

            <v-btn variant="plain" icon="mdi-magnify" @click="searchShowed = !searchShowed" ></v-btn>
            
            <!-- menu affichage des notif -->
                <v-menu v-model="menunotif" :location="bottom" :close-on-content-click="false" >
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="plain" icon="mdi-bell" ></v-btn>
                    </template>
                    <v-card min-width="300">
                        <v-list>
                            <div v-for="notif in notifs" :key="notif.titre">
                                <v-list-item
                                    :prepend-avatar="notif.video"
                                    :subtitle="notif.chaine"
                                    :title="notif.titre"
                                >
                                </v-list-item>
                            </div >
                            <!-- <v-list-item
                                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                                subtitle="chaine"
                                title="Titre de la video"
                            >
                            </v-list-item> -->
                        </v-list>
                    </v-card>
                </v-menu>
            <!-- menu paramétre compte  -->
                <v-menu v-model="menucompte" :location="bottom" :close-on-content-click="false" >
                    <template v-slot:activator="{ props  }">
                        <v-btn v-bind="props" variant="plain" icon="mdi-account" ></v-btn>
                    </template>
                    <v-card min-width="300">
                        <v-list>
                            <v-btn variant="plain" color="bar" prepend-icon="mdi-cog">Paramétre</v-btn><br>
                            <v-btn variant="plain" color="bar" prepend-icon="mdi-account">Compte</v-btn><br>
                            <v-btn variant="plain" color="bar" prepend-icon="mdi-upload">Mettre en ligne</v-btn><br>
                            <v-btn variant="plain" color="bar" prepend-icon="mdi-logout">Se déconnecter</v-btn>
                        </v-list>
                    </v-card>
                </v-menu>
    </v-app-bar>
    
    <!-- Section verification  -->

    <!--<br><br>
        <h1 class="display-4">resultat navbar</h1>
        <div class="row">-->
        <!-- Correction de l'affichage des commandes pour montrer le titre du bouton commandé -->
        <!-- <div class="col-3" v-for="commande in commandes" :key="commande.titre">
            <p >{{ commande.link }}  + {{ commande.perm }} </p>
        </div>
        </div> -->

  </template>
  
  

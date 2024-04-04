<script setup lang="ts">
    import { ref } from 'vue';
    // Définition du type pour les Boutons et commandes
    interface Bouton {
    titre: string;
    link: string;
    perm: string;
    }

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
                <v-menu v-model="menunotif" :location="bottom" :close-on-content-click="false" >
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="plain" icon="mdi-bell" ></v-btn>
                    </template>
                    <v-card min-width="300">
                        <v-list>
                        <v-list-item
                            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                            subtitle="Founder of Vuetify"
                            title="John Leider"
                        >
                        </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
                <v-menu v-model="menucompte" :location="bottom" :close-on-content-click="false" >
                    <template v-slot:activator="{ props  }">
                        <v-btn v-bind="props" variant="plain" icon="mdi-account" ></v-btn>
                    </template>
                    <v-card min-width="300">
                        <v-list>
                        <v-list-item
                            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                            subtitle="Founder of Vuetify"
                            title="John Leider"
                        >
                        </v-list-item>
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
  
  

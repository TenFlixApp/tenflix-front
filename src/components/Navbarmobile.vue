<!-- <script setup lang="ts">
    import { ref } from 'vue';
    // Définition du type pour les Boutons et commandes

</script> -->
<template>
    <v-app-bar :elevation="2" rounded>
        <div class="d-flex justify-space-around w-100">
            <v-btn variant="plain"  prepend-icon="mdi-home" stacked>acceuil</v-btn>
            <v-btn variant="plain"  prepend-icon="mdi-layers" stacked>abonnement</v-btn>
            <v-btn variant="plain"  prepend-icon="mdi-menu" stacked>plus</v-btn>
        </div>
    </v-app-bar>
</template>
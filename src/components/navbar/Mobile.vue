<template>
    <div class="d-flex align-end div-en-bas ">
        <div class="d-flex justify-space-around w-100">
            <v-btn variant="plain"  prepend-icon="mdi-home" stacked>acceuil</v-btn>
            <v-btn variant="plain"  prepend-icon="mdi-layers" stacked>abonnement</v-btn>
            <v-btn variant="plain"  prepend-icon="mdi-menu" stacked>plus</v-btn>
        </div>
    </div>
</template>

<style>
.div-en-bas {
    position: fixed; /* Fixe la div par rapport à la fenêtre du navigateur */
    bottom: 0; /* Aligner la div au bas de la fenêtre */
    width: 100%; /* Fait en sorte que la div s'étende sur toute la largeur */
    text-align: center; /* Centrer le texte à l'intérieur de la div */
    padding: 20px 0; /* Ajouter un peu d'espace au-dessus et en dessous du texte */
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface Bouton { icon: string, text: string, routeName: string }

const router = useRouter();

const buttons = ref<Bouton[]>([
    { icon: 'mdi-home', text: 'accueil', routeName: 'home' },
    { icon: 'mdi-layers', text: 'abonnement', routeName: 'abonnements' },
    { icon: 'mdi-menu', text: 'menu', routeName: 'menu' }
]);
</script>

<template>
    <v-bottom-navigation grow class="nav">
        <v-btn variant="plain" v-for="button in buttons" @click="router.push({ name: button.routeName })">
            <v-icon>{{ button.icon }}</v-icon>
            {{ button.text }}
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
</style>
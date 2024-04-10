<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/Auth';

interface Bouton { icon: string, text: string, function: () => void, red?: boolean }

const router = useRouter();

const authService = new AuthService();

const buttons = ref<Bouton[]>([
    { icon: 'mdi-magnify', text: 'Recherche', function: () => router.push({ name: 'search', params: { search: ' '}}) },
    { icon: 'mdi-account', text: 'Mon compte', function: () => router.push({ name: 'account' }) },
    { icon: 'mdi-view-dashboard', text: 'Dashboard', function: () => router.push({ name: 'dashboard' }) },
    { icon: 'mdi-playlist-play', text: 'Mes playlists', function: () => router.push({ name: 'playlists' }) },
    { icon: 'mdi-upload', text: 'Mettre en ligne', function: () => router.push({ name: 'upload' }) },
    { icon: 'mdi-logout', text: 'Se déconnecter', function: () => { authService.logout(); location.reload() }, red: true}
]);
</script>

<template>
  <div class="px-auto d-flex flex-column h-100 ga-8 pt-8">
    <v-btn size="x-large" variant="plain" v-for="button of buttons" :prepend-icon="button.icon" :color="button.red ? 'red' : ''"
    @click="button.function">
      {{ button.text }}
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
</style>

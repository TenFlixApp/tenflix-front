<script setup lang="ts">
import { useRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'

const router = useRouter();

function navigate(name: string) {
  router.push({name})
}
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <nav>
    <v-btn v-on:click="navigate('home')">
      Button1
    </v-btn>
    <v-btn v-on:click="navigate('about')">
      Button2
    </v-btn>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>

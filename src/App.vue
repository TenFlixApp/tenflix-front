<script setup lang="ts">
import Navbar from '@/components/navbar/Desktop.vue'
</script>

<template>
  <v-app>
    <v-main>
      <Navbar />
      <RouterView />
    </v-main>
  </v-app>
</template>

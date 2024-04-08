<script setup lang="ts">
import Navbar from '@/components/navbar/Desktop.vue'
import { useDialogStore } from '@/stores';

const dialogStore = useDialogStore()
</script>

<template>
  <v-app>
    <component v-for="dialog in dialogStore.dialogs" :is="dialog.component" v-bind="{ guid: dialog.guid, ...dialog.props }" />
    <Navbar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

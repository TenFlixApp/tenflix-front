<script setup lang="ts">
import Navbar from '@/components/navbar/Desktop.vue'
import { useDialogStore } from '@/stores';
import { useRoute } from 'vue-router';

const route = useRoute();

const dialogStore = useDialogStore()
</script>

<template>
  <v-app>
    <component v-for="dialog in dialogStore.dialogs" :is="dialog.component" v-bind="{ guid: dialog.guid, ...dialog.props }" />
    <v-main>
      <Navbar v-if="route.name !== ''" />
      <RouterView />
    </v-main>
  </v-app>
</template>

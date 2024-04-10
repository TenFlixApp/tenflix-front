<script setup lang="ts">
import Navbar from '@/components/navbar/Desktop.vue'
import NavbarMobile from '@/components/navbar/Mobile.vue'
import { useDialogStore } from '@/stores';
import { useRoute } from 'vue-router';

const route = useRoute();

const dialogStore = useDialogStore()
</script>

<template>
  <v-app>
    <component v-for="dialog in dialogStore.dialogs" :is="dialog.component" v-bind="{ guid: dialog.guid, ...dialog.props }" />
    <v-main>
      <v-template v-if="route.name !== ''">
        <NavbarMobile v-if="$vuetify.display.mobile" />
        <Navbar v-else />
      </v-template>
      <RouterView />
    </v-main>
  </v-app>
</template>

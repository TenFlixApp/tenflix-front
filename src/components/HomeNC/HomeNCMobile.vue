<script setup lang="ts">
import AuthDialog from "@/components/Dialogs/AuthDialog.vue"
import { useAuthStore, useDialogStore } from "@/stores";

const dialogStore = useDialogStore()
const authStore = useAuthStore()

function openDialog(type: string) {
  authStore.dialogType = type
  dialogStore.createDialog(AuthDialog)
}
</script>

<template>
  <div class="home-nc w-100 h-screen overflow-hidden d-flex flex-column justify-space-evenly align-center">
    <h1>Tenflix</h1>
    <v-img :max-height="300" :aspect-ratio="16/9" class="w-75" src="/assets/HomeNC/icons.png" alt="HomeNCMobile"></v-img>
    <div class="d-flex flex-column ga-8 w-100 px-16">
      <v-btn @click.prevent="openDialog('register')" size="x-large" variant="elevated" text="Je crée mon compte !" />
      <v-btn @click.prevent="openDialog('login')" class="btn-connect" color="#bb86fc" size="x-large"  variant="outlined" text="Je me connecte !" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home-nc {
    background-image: url("/assets/HomeNC/HomeNCMobile.png");
    background-size: cover;

    h1 {
      font-family: "Helvetica Rounded";
      font-size: 86px;
      color: #e0e0e0;
    }

    .btn-connect {
      background-color: #262626;
    }
  }
</style>
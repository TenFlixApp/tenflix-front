<script setup lang="ts">
import AuthDialog from "@/components/Dialogs/AuthDialog.vue"
import { ref } from "vue"

const dialogOpened = ref(false)
const dialogType = ref("")

function openDialog(event: Event, type: string) {
  event.preventDefault();
  dialogOpened.value = true
  dialogType.value = type
}

function changeDialog(type: string) {
  dialogType.value = type
}

function closeDialog() {
  dialogOpened.value = false
}
</script>

<template>
  <div class="home-nc w-100 h-screen overflow-hidden d-flex flex-column justify-space-evenly align-center">
    <h1>Tenflix</h1>
    <v-img :max-height="300" :aspect-ratio="16/9" class="w-75" src="/assets/HomeNC/icons.png" alt="HomeNCMobile"></v-img>
    <div class="d-flex flex-column ga-8 w-100 px-16">
      <v-btn v-on:click="openDialog($event, 'register')" size="x-large" variant="elevated" text="Je crée mon compte !" />
      <v-btn v-on:click="openDialog($event, 'login')" class="btn-connect" color="#bb86fc" size="x-large"  variant="outlined" text="Je me connecte !" />
    </div>
    <AuthDialog @change-dialog="changeDialog($event)" @close-dialog="closeDialog" :dialog-opened="dialogOpened" :dialog-type="dialogType" />
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
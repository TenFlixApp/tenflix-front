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
  <div class="home-nc w-100 h-screen">
    <div class="content mx-4 w-25 my-auto h-screen d-flex flex-column justify-center align-end">
      <h1>Tenflix</h1>
      <span>Le streaming autrement</span>
      <a @click.prevent="openDialog('register')" href="" class="subtext">Cliquez ici <v-icon>mdi-arrow-right-thin</v-icon></a>
    </div>
    <div class="pictures h-screen">
    </div>
    <v-btn color="#e0e0e0" variant="outlined" class="connect" text="se connecter" @click="openDialog('login')"></v-btn>
  </div>
</template>

<style scoped lang="scss">
  .home-nc {
    background-color: #121212;

    .content {
      color: #E0E0E0 !important;
      text-align: end;

      h1 {
        font-size: 94px;
        background: linear-gradient(to right, #bb86fc , #e0e0e0); 
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      a {
        text-decoration: none;
        color: #E0E0E0;
        &:hover {
          text-decoration: underline;
          color: #bb86fc;
        }
      }
    }

    .pictures, .connect {
      position: absolute;
      
      &.pictures {
        top: 0;
        right: 0;
        opacity: 0.5;
        width: 50vw;
        background-image: url("/assets/HomeNC/HomeNC.png");
        background-size: cover;
      }

      &.connect {
        position: absolute;
        top : 20px;
        right: 20px;
        background-color: #bb86fc;
      }
    }

  }
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import MediaService from '@/services/media';

const router = useRouter();

const mediaService = new MediaService();

const media = ref<File[]>([]);
const cover = ref<File[]>([]);
const title = ref('');
const description = ref('');

function upload() {
  const errors = [];
  if (media.value.length !== 1 || cover.value.length !== 1) {
    errors.push('Vous devez sélectionner un fichier média et une cover');
  }
  if (title.value === '') {
    errors.push('Vous devez renseigner un titre');
  }
  if (description.value === '') {
    errors.push('Vous devez renseigner une description');
  }
  for (const error of errors) {
    toast.error(error);
  }
  if (errors.length > 0) {
    return;
  }

  mediaService.uploadMedia(media.value[0], cover.value[0], title.value, description.value)
    .then(() => {
      toast.success('Média uploadé avec succès, vous allez être redirigé vers l\'acceuil dans quelques secondes');
      setTimeout(() => {
        router.push({ name: 'home' });
      }, 5000);
    })
    .catch(() => {
      toast.error('Erreur lors de l\'upload du média');
    });
}
</script>

<template>
  <div>
    <v-row class="pt-4 px-4">
      <v-col cols="12" md="6" class="d-flex flex-column ga-4">
        <v-file-input v-model="media" label="Fichier média" prepend-icon="" accept="video/*" persistent-clear
          persistent-hint variant="outlined" color="accent"></v-file-input>
        <v-file-input v-model="cover" label="Cover" prepend-icon="" accept="image/*" persistent-clear persistent-hint
          variant="outlined" color="accent"></v-file-input>
      </v-col>
      <v-col cols="12" md="6">
        <h4>Titre du média</h4>
        <v-text-field v-model="title" color="accent"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="px-4">
      <v-col cols="12">
        <h4>Description du média</h4>
        <v-textarea v-model="description" color="accent"></v-textarea>
      </v-col>
    </v-row>
    <v-row class="px-4">
      <v-col cols="12" class="d-flex ga-16" :class="$vuetify.display.mobile ? 'justify-center' : 'justify-end'">
        <v-btn @click="router.push({name: 'home'})" color="#e0e0e0">Retour à l'acceuil</v-btn>
        <v-btn @click="upload" prepend-icon="mdi-upload" color="accent">Upload</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
h4 {
  margin-bottom: 12px;
  text-decoration: underline;
}
</style>

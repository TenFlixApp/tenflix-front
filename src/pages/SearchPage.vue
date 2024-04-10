<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { MediaPreview } from '@/Types';
import MediaService from '@/services/media';
import { toast } from 'vue3-toastify';
import MediaPreviewComponent from '@/components/Medias/MediaPreview.vue';

const route = useRoute();
const router = useRouter();

const mediaService = new MediaService();

const search = ref<string>(route.params.search as string);

const results = ref<MediaPreview[]>([]);

async function searchMedia() {
  mediaService.searchMedia(search.value).then((data) => {
    results.value = data;
  }).catch(() => {
    toast.error('Erreur lors de la recherche');
  });
}

function applyResearch() {
  if (search.value && search.value.length > 0) {
    router.push({ name: 'search', params: { search: search.value } })
  }
}

searchMedia();

watch(() => route.params.search, (value) => {
  Array.isArray(value) ? search.value = value[0] : search.value = value;
  // TODO - fetch le résultat de la recherche
  
  searchMedia();
})
</script>

<template>
  <div class="d-flex flex-column ga-4 pt-4 px-4 justify-center">
    <v-form v-if="$vuetify.display.mobile" @submit.prevent="applyResearch">
      <v-text-field
        v-model="search"
        label="Rechercher"
        outlined
        dense
        clearable
        append-icon="mdi-magnify"
      ></v-text-field>
    </v-form>
    <p>Résultats de recherche pour "{{ $route.params.search }}"</p>
    <v-row>
      <v-col v-for="media in results" :key="media.uuid" cols="12" sm="3">
        <MediaPreviewComponent :media="media" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
</style>

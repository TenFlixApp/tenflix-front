<script setup lang="ts">
import { MediaPreviewType } from '@/Types';
import MediaService from '@/services/media'
import { ref } from 'vue'
import { toast } from 'vue3-toastify';
import MediaPreview from '@/components/Medias/MediaPreview.vue';

const medias = ref<MediaPreviewType[]>([])

const mediaService = new MediaService();

mediaService.getRandomMedia(20).then((data) => {
  medias.value = data;
}).catch(() => {
  toast.error('Impossible de charger les vidéos')
})
</script>

<template>
  <div class="px-4 py-4">
    <h4>Vidéos</h4>
    <v-row>
      <v-col cols="12" sm="4" md="3" v-for="media in medias">
        <MediaPreview :media="media" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ref } from 'vue';
import PlaylistService from '@/services/playlist';
import Playlist from '@/Models/Playlist';
import { toast } from 'vue3-toastify';
import MediaPreview from '@/components/Medias/MediaPreview.vue';
import { MediaPreviewType } from '@/Types';

const inputPlaylist = ref<boolean>(false);
const loadingCreation = ref<boolean>(false);
const playlistName = ref<string>('');
const playlists = ref<Playlist[]>([]);
const playlistMedias = ref<MediaPreviewType[]>([]);

const playlistService = new PlaylistService();

async function getPlaylists() {
  playlistService.getPlaylists().then((data) => {
    playlists.value = data;
  }).catch(() => {
    playlists.value = [];
    toast.error('Erreur lors de la récupération des playlists');
  });
}

getPlaylists();

async function createPlaylist() {
  loadingCreation.value = true;
  playlistService.createPlaylist(playlistName.value).then(() => {
    playlistName.value = '';
    inputPlaylist.value = false;
    loadingCreation.value = false;
    getPlaylists();
    toast.success('Playlist créée avec succès');
  }).catch(() => {
    loadingCreation.value = false;
    toast.error('Erreur lors de la création de la playlist');
  });
}

async function selectPlaylyst(playlist: Playlist) {
  playlistService.getPlaylistMedias(playlist.id).then((data) => {
    playlistMedias.value = data;
    console.log(data)
  }).catch(() => {
    playlistMedias.value = [];
    toast.error('Erreur lors de la récupération des médias de la playlist');
  });
}
</script>

<template>
  <v-row class="h-100">
    <v-col class="list-playlist overflow-y-auto d-flex flex-column align-center ga-4 px-8 mt-4" cols="12" md="4">
      <v-btn variant="plain" v-for="playlist in playlists" class="w-100 text-left" @click="selectPlaylyst(playlist)">
        {{ playlist.titre }}
      </v-btn>
      <v-btn :prepend-icon="inputPlaylist ? 'mdi-close' : 'mdi-plus'" class="w-100" @click="inputPlaylist = !inputPlaylist">
        {{ inputPlaylist ? 'Annuler' : 'Créer une playlist' }}
      </v-btn>
      <v-text-field :loading="loadingCreation" :append-inner-icon="playlistName.trim().length > 0 ? 'mdi-plus' : ''"
        label="Playlist" variant="solo" hide-details single-line @click:append-inner="createPlaylist"
        v-if="inputPlaylist" class="w-100 input-playlist" v-model="playlistName" @keydown.enter.prevent="createPlaylist" />
    </v-col>
    <v-col class="px-4 mt-4" cols="12" md="8">
      <v-row>
        <v-col cols="12" md="4" v-for="media in playlistMedias">
          <MediaPreview :media="media" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.list-playlist {
  border-right: 4px #e0e0e0 solid;

  .input-playlist {
    max-height: 60px;
  }
}
</style>

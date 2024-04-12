<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { getCoverURL, getMediaURL } from '@/helpers/Files';
import videojs from 'video.js';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';
import 'video.js/dist/video-js.css';
import { Playlist } from '@/Models';
import PlaylistService from '@/services/playlist';
import { toast } from 'vue3-toastify';

const route = useRoute();

const mediaCoverUrl = ref<string>(getCoverURL(route.params.id as string));
const mediaUrl = ref<string>(getMediaURL(route.params.id as string));

const videoPlayer = ref();
const test = ref();

const playlists = ref<Playlist[]>([]);

const playlistService = new PlaylistService();

async function getPlaylists() {
    playlistService.getPlaylists().then((data) => {
        playlists.value = data;
    }).catch(() => {
        playlists.value = [];
    });
}

getPlaylists();

onMounted(() => {
    test.value = videojs(videoPlayer.value, {
        controls: true,
        autoplay: false,
        preload: 'none',
        fluid: true,
        responsive: true,
        sources: [
            {
                src: mediaUrl.value,
                type: 'video/avi'
            },
            {
                src: mediaUrl.value,
                type: 'video/mp4'
            }
        ],
        poster: mediaCoverUrl.value,
        aspectRatio: '16:9',
        plugins: {
            hotkeys: {
            volumeStep: 0.1,
            seekStep: 5,
            enableModifiersForNumbers: false
            },
        }
    })
})

onBeforeUnmount(() => {
    test.value?.dispose();
})

watch(() => route.params.id, () => {
    mediaCoverUrl.value = getCoverURL(route.params.id as string);
    mediaUrl.value = getMediaURL(route.params.id as string);
});

async function addMediaToPlaylist(playlistId: number) {
    playlistService.addMediaToPlaylist(playlistId, route.params.id as string).then(() => {
        toast.info('Media added to playlist');
    }).catch(() => {
        toast.error('Error while adding media to playlist');
    });
}

</script>

<template>
    <div>
        <v-row>
            <v-col cols="12" md="9">
                <video ref="videoPlayer" class="video-js" @contextmenu.prevent />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <h4>Titre</h4>
            </v-col>
            <v-col cols="10" md="3">
                <div class="rounded-xl stats d-flex justify-space-around align-center">
                    <v-btn size="small" prepend-icon="mdi-thumb-up" variant="text">
                        184 k
                    </v-btn>
                    <v-btn size="small" prepend-icon="mdi-thumb-down" variant="text">
                        1 k
                    </v-btn>
                    <v-menu location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn size="small" prepend-icon="mdi-plus" variant="text" v-bind="props">
                                Ajouter
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="item in playlists" :title="item.titre" @click="addMediaToPlaylist(item.id)" />
                        </v-list>
                    </v-menu>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped lang="scss">
.stats {
    color: #bb86fc !important;
    background-color: #262626;
}
</style>

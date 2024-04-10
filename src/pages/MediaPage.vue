<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { getCoverURL, getMediaURL } from '@/helpers/Files';
import videojs from 'video.js';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';
import 'video.js/dist/video-js.css';

const route = useRoute();

const mediaCoverUrl = ref<string>(getCoverURL(route.params.id as string));
const mediaUrl = ref<string>(getMediaURL(route.params.id as string));

const videoPlayer = ref();
const test = ref();

onMounted(() => {
    test.value = videojs(videoPlayer.value, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        responsive: true,
        sources: [{
            src: mediaUrl.value,
            type: 'video/mp4'
        }],
        poster: mediaCoverUrl.value,
        aspectRatio: '16:9'
    })
})

onBeforeUnmount(() => {
    test.value?.dispose();
})

watch(() => route.params.id, () => {
    mediaCoverUrl.value = getCoverURL(route.params.id as string);
    mediaUrl.value = getMediaURL(route.params.id as string);
});
</script>

<template>
    <div>
        <v-row>
            <v-col cols="12" md="9">
                <video ref="videoPlayer" class="video-js" ></video>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped lang="scss">
#my-player {
    width: 100%;
    height: auto;
}
</style>

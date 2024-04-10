<script setup lang="ts">
import { MediaPreviewType } from '@/Types';
import { getCoverURL } from '@/helpers/Files';
import { useRouter } from 'vue-router';

const props = defineProps<{media: MediaPreviewType}>();

const router = useRouter();
</script>

<template>
    <v-card @click="router.push({ name: 'media', params: { id: props.media.uuid } })">
        <v-img class="cover-card" :src="getCoverURL(props.media.uuid)" cover />
        <v-card-title>{{ props.media.titre }}</v-card-title>
        <v-card-subtitle v-if="props.media.createur">
            <v-list-item :prepend-avatar="props.media.createur?.avatar" :prepend-icon="!props.media.createur?.avatar ? 'mdi-account' : ''" >
                {{ props.media.createur?.prenom || '' }} {{ props.media.createur?.nom || '' }}
            </v-list-item>
        </v-card-subtitle>
    </v-card>
</template>

<style scoped lang="scss">
    .cover-card {
        height: 150px;
        
    }
</style>
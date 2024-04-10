<script setup lang="ts">
import { MediaPreview } from '@/Types';
import { getCoverURL } from '@/helpers/Files';

const props = defineProps<{media: MediaPreview}>();
console.log(props.media, getCoverURL(props.media.uuid));
</script>

<template>
    <v-card>
        <v-img class="cover-card" :src="getCoverURL(props.media.uuid)" cover />
        <v-card-title>{{ props.media.titre }}</v-card-title>
        <v-card-subtitle v-if="props.media.user">
            <v-list-item :prepend-avatar="props.media.user?.uuid || 'mdi-account'" />
        </v-card-subtitle>
    </v-card>
</template>

<style scoped lang="scss">
    .cover-card {
        height: 150px;
        
    }
</style>
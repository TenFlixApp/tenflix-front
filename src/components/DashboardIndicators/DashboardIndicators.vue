<script setup lang="ts">
const props = defineProps(['titre', 'nombre'])
</script>

<template>
    <div class="d-flex justify-center card rounded-lg py-4">
        <div class="d-flex flex-column ga-4 card-content pl-4">
            <span class="text-subtitle-2">{{ props.titre }}</span>
            <span class="text-h4">{{ props.nombre }}</span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.card {
    background: #262626;
    .card-content {
        width: 90%;
        border-left: 5px solid #bb86fc;
    }
}
</style>
<script setup lang="ts">
    import HomeNCDekstop from '@/components/HomeNC/HomeNCDekstop.vue'
    import HomeNCMobile from '@/components/HomeNC/HomeNCMobile.vue'

    
</script>

<template>
  <HomeNCDekstop v-if="!$vuetify.display.mobile" />
  <HomeNCMobile v-else />
</template>
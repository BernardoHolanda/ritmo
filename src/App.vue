<script setup>
import { useRoute } from 'vue-router'
import BarraNavegacao from './components/BarraNavegacao.vue'

const route = useRoute()
</script>

<template>
  <RouterView />
  <BarraNavegacao v-if="!route.meta.publica" />
</template>

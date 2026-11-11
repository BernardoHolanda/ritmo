<script setup>
import { usuario } from './data/mock.js'
</script>

<template>
  <main class="app">
    <h1>Ritmo</h1>
    <p>Olá, {{ usuario.nome }}! O app começa aqui.</p>
  </main>
</template>

<style scoped>
.app {
  padding: 24px 16px;
}
</style>

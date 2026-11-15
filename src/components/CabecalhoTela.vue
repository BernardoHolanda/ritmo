<script setup>
defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  voltar: { type: String, default: '' },
})
</script>

<template>
  <header class="cabecalho">
    <RouterLink v-if="voltar" :to="voltar" class="voltar" aria-label="Voltar">‹</RouterLink>
    <div class="textos">
      <p v-if="subtitulo" class="subtitulo">{{ subtitulo }}</p>
      <h1>{{ titulo }}</h1>
    </div>
    <slot />
  </header>
</template>

<style scoped>
.cabecalho {
  display: flex;
  align-items: center;
  gap: 12px;
}

.textos {
  flex: 1;
}

h1 {
  font-size: 26px;
  line-height: 1.15;
}

.subtitulo {
  color: var(--tinta-3);
  font-size: 13px;
  font-weight: 600;
}

.subtitulo::first-letter {
  text-transform: uppercase;
}

.voltar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--superficie-2);
  color: var(--tinta);
  font-size: 28px;
  text-decoration: none;
}
</style>

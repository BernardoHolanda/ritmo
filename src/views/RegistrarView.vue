<script setup>
import CabecalhoTela from '../components/CabecalhoTela.vue'
import { categorias } from '../data/mock.js'

const descricoes = {
  atividade: 'Modalidade, duração e intensidade',
  sono: 'Horas dormidas e qualidade',
  alimentacao: 'Refeição e o que você comeu',
  humor: 'Como você está se sentindo',
}
</script>

<template>
  <main class="tela">
    <CabecalhoTela titulo="O que você quer registrar?" subtitulo="Registrar" />
    <nav class="lista" aria-label="Categorias de registro">
      <RouterLink
        v-for="(info, categoria) in categorias"
        :key="categoria"
        :to="`/registrar/${categoria}`"
        class="cartao item"
        :style="{ '--cor': info.cor }"
      >
        <strong>{{ info.titulo }}</strong>
        <span class="legenda">{{ descricoes[categoria] }}</span>
      </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
.lista {
  display: grid;
  gap: 10px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 4px solid var(--cor);
  color: inherit;
  text-decoration: none;
}

.item strong {
  font-size: 16px;
}
</style>

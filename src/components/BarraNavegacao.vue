<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const ativo = (para) => {
  if (para === '/') return route.path === '/'
  // a retrospectiva faz parte do histórico
  if (para === '/historico') return route.path === '/historico' || route.path === '/retrospectiva'
  return route.path.startsWith(para)
}
const itens = [
  { para: '/', rotulo: 'Hoje', icone: '◐' },
  { para: '/registrar', rotulo: 'Registrar', icone: '＋' },
  { para: '/historico', rotulo: 'Histórico', icone: '☰' },
  { para: '/metas', rotulo: 'Metas', icone: '◎' },
  { para: '/pontuacao', rotulo: 'Pontos', icone: '★' },
  { para: '/objetivo', rotulo: 'Objetivo', icone: '⚑' },
]
</script>

<template>
  <nav class="barra" aria-label="Navegação principal">
    <RouterLink
      v-for="item in itens"
      :key="item.para"
      :to="item.para"
      class="item"
      :class="{ ativo: ativo(item.para) }"
      :aria-current="ativo(item.para) ? 'page' : undefined"
    >
      <span class="icone" aria-hidden="true">{{ item.icone }}</span>
      {{ item.rotulo }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.barra {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom));
  background: var(--superficie);
  border-top: 1px solid var(--linha);
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 0;
  border-radius: 12px;
  color: var(--tinta-3);
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
}

.icone {
  font-size: 20px;
  line-height: 1;
}

.ativo {
  color: var(--marca-escura);
  background: var(--superficie-2);
}
</style>

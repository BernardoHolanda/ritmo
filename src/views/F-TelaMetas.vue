<script setup>
import { ref } from 'vue'
import BarraProgresso from '../components/BarraProgresso.vue'
import CabecalhoTela from '../components/CabecalhoTela.vue'
import { categorias } from '../data/mock.js'
import { consultarMetas } from '../controle/C-Metas.js'
import { objetivoAtivo } from '../controle/C-Objetivo.js'
import { formatarData } from '../utils/datas.js'

const metas = ref(consultarMetas())
const situacao = {
  ativa: 'Em andamento',
  cumprida: 'Cumprida',
  expirada: 'Expirada',
}

function percentual(meta) {
  return Math.min(100, Math.round((meta.progresso / meta.valorAlvo) * 100))
}
</script>

<template>
  <main class="tela">
    <CabecalhoTela titulo="Metas" :subtitulo="objetivoAtivo ? objetivoAtivo.descricao : 'Sem objetivo'" />

    <section v-if="!metas" class="cartao vazio">
      <p>Defina seu objetivo principal para receber metas.</p>
      <RouterLink to="/objetivo" class="botao botao-primario">Definir objetivo</RouterLink>
    </section>

    <template v-else>
      <p class="legenda">
        Semana de {{ formatarData(metas[0].dataInicio) }} a {{ formatarData(metas[0].dataFim) }}
      </p>

      <article
        v-for="meta in metas"
        :key="meta.idMeta"
        class="cartao meta"
        :style="{ '--cor': categorias[meta.categoria].cor }"
      >
        <header class="topo">
          <h2>{{ categorias[meta.categoria].titulo }}</h2>
          <span class="situacao" :class="meta.status">{{ situacao[meta.status] }}</span>
        </header>
        <p>{{ meta.descricao }}</p>
        <BarraProgresso :percentual="percentual(meta)" :cor="categorias[meta.categoria].cor" />
        <p class="numeros">{{ meta.progresso }} de {{ meta.valorAlvo }} {{ meta.unidade }}</p>
      </article>

      <p class="legenda aviso">
        As metas são orientações de acompanhamento e não substituem diagnóstico ou prescrição médica.
      </p>
    </template>
  </main>
</template>

<style scoped>
.vazio {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 4px solid var(--cor);
}

.topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

h2 {
  font-size: 16px;
}

.situacao {
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--superficie-2);
  color: var(--tinta-2);
  font-size: 12px;
  font-weight: 600;
}

.situacao.cumprida {
  background: var(--ok);
  color: #fff;
}

.numeros {
  color: var(--tinta-2);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.aviso {
  text-align: center;
}
</style>

<script setup>
import { computed, ref } from 'vue'
import CabecalhoTela from '../components/CabecalhoTela.vue'
import OpcoesEscolha from '../components/OpcoesEscolha.vue'
import { categorias } from '../data/constantes.js'
import { consultar } from '../controle/C-Historico.js'
import { formatarData } from '../utils/datas.js'

const periodo = ref(7)
const categoria = ref('todas')

const periodos = [
  { valor: 7, rotulo: '7 dias' },
  { valor: 30, rotulo: '30 dias' },
  { valor: 90, rotulo: '90 dias' },
]
const filtros = [
  { valor: 'todas', rotulo: 'Todas' },
  ...Object.entries(categorias).map(([valor, info]) => ({ valor, rotulo: info.titulo })),
]

const grupos = computed(() => consultar(periodo.value, categoria.value === 'todas' ? null : categoria.value))

function nomeDoDia(dia) {
  return formatarData(dia, { weekday: 'long', day: '2-digit', month: '2-digit' })
}
</script>

<template>
  <main class="tela">
    <CabecalhoTela titulo="Histórico" subtitulo="Seus registros" />

    <OpcoesEscolha v-model="periodo" :opcoes="periodos" rotulo="Período" />
    <OpcoesEscolha v-model="categoria" :opcoes="filtros" rotulo="Categoria" />

    <section v-if="!grupos.length" class="cartao vazio">
      <p>Nenhum registro neste período.</p>
      <RouterLink to="/registrar" class="botao botao-primario">Registrar agora</RouterLink>
    </section>

    <section v-for="grupo in grupos" :key="grupo.dia" class="dia" :aria-label="nomeDoDia(grupo.dia)">
      <h2>{{ nomeDoDia(grupo.dia) }}</h2>
      <article
        v-for="registro in grupo.registros"
        :key="registro.idRegistro"
        class="cartao registro"
        :style="{ '--cor': categorias[registro.categoria].cor }"
      >
        <header class="topo">
          <strong>{{ categorias[registro.categoria].titulo }}</strong>
          <span class="legenda">{{ registro.hora }}</span>
        </header>
        <p>{{ registro.resumo }}</p>
        <p v-if="registro.observacao" class="legenda">{{ registro.observacao }}</p>
      </article>
    </section>

    <RouterLink to="/retrospectiva" class="botao botao-bloco">Ver retrospectiva da semana</RouterLink>
  </main>
</template>

<style scoped>
.vazio {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.dia {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dia h2 {
  color: var(--tinta-2);
  font-size: 14px;
  text-transform: capitalize;
}

.registro {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 4px solid var(--cor);
}

.topo {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
</style>

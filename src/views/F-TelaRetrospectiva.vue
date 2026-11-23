<script setup>
import { computed, ref } from 'vue'
import BarraProgresso from '../components/BarraProgresso.vue'
import CabecalhoTela from '../components/CabecalhoTela.vue'
import { categorias } from '../data/constantes.js'
import { gerar } from '../controle/C-Retrospectiva.js'
import { formatarData } from '../utils/datas.js'

const deslocamento = ref(0)
const retrospectiva = computed(() => gerar(deslocamento.value))

const numero = (valor) => valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
const maisRegistros = computed(() => Math.max(1, ...retrospectiva.value.porDia.map((d) => d.quantidade)))

const resumo = computed(() => {
  const r = retrospectiva.value
  return [
    { categoria: 'atividade', texto: r.atividade.sessoes ? `${r.atividade.minutos} min em ${r.atividade.sessoes} ${r.atividade.sessoes === 1 ? 'sessão' : 'sessões'}` : '' },
    { categoria: 'sono', texto: r.sono.noites ? `${numero(r.sono.mediaHoras)} h por noite em média (${r.sono.noites} ${r.sono.noites === 1 ? 'registro' : 'registros'})` : '' },
    { categoria: 'alimentacao', texto: r.alimentacao.refeicoes ? `${r.alimentacao.refeicoes} ${r.alimentacao.refeicoes === 1 ? 'refeição registrada' : 'refeições registradas'}` : '' },
    { categoria: 'humor', texto: r.humor.dias ? `Humor médio ${numero(r.humor.media)} de 5 em ${r.humor.dias} ${r.humor.dias === 1 ? 'dia' : 'dias'}` : '' },
  ]
})

function diaDaSemana(dia) {
  return formatarData(dia, { weekday: 'narrow' })
}
</script>

<template>
  <main class="tela">
    <CabecalhoTela
      titulo="Retrospectiva"
      :subtitulo="`Semana de ${formatarData(retrospectiva.inicio)} a ${formatarData(retrospectiva.fim)}`"
    />

    <nav class="semanas" aria-label="Escolher semana">
      <button type="button" class="botao" @click="deslocamento--">‹ Anterior</button>
      <button type="button" class="botao" :disabled="deslocamento === 0" @click="deslocamento++">Próxima ›</button>
    </nav>

    <section v-if="!retrospectiva.totalRegistros" class="cartao vazio">
      <p>Sem registros nesta semana.</p>
      <RouterLink to="/registrar" class="botao botao-primario">Registrar agora</RouterLink>
    </section>

    <template v-else>
      <section class="cartao destaques" aria-label="Destaques da semana">
        <div>
          <strong>{{ retrospectiva.diasComRegistro }}/7</strong>
          <span class="legenda">dias com registro</span>
        </div>
        <div>
          <strong>{{ retrospectiva.pontos }}</strong>
          <span class="legenda">pontos</span>
        </div>
        <div>
          <strong>{{ retrospectiva.metas.cumpridas }}/{{ retrospectiva.metas.total }}</strong>
          <span class="legenda">metas cumpridas</span>
        </div>
      </section>

      <section class="cartao dias" aria-label="Registros por dia">
        <h2>Registros por dia</h2>
        <div class="colunas">
          <div v-for="d in retrospectiva.porDia" :key="d.dia" class="coluna">
            <span class="quantidade">{{ d.quantidade }}</span>
            <BarraProgresso :percentual="Math.round((d.quantidade / maisRegistros) * 100)" />
            <span class="legenda">{{ diaDaSemana(d.dia) }}</span>
          </div>
        </div>
      </section>

      <template v-for="item in resumo" :key="item.categoria">
        <article class="cartao categoria" :style="{ '--cor': categorias[item.categoria].cor }">
          <h2>{{ categorias[item.categoria].titulo }}</h2>
          <p v-if="item.texto">{{ item.texto }}</p>
          <p v-else class="legenda">Sem registro nesta semana.</p>
        </article>
      </template>
    </template>

    <RouterLink to="/pontuacao" class="botao botao-bloco">Ver pontuação e sequência</RouterLink>
  </main>
</template>

<style scoped>
.semanas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.botao:disabled {
  opacity: 0.45;
  cursor: default;
}

.vazio {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.destaques {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  text-align: center;
}

.destaques div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.destaques strong {
  font-size: 22px;
  font-variant-numeric: tabular-nums;
}

.dias {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h2 {
  font-size: 16px;
}

.colunas {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.coluna {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.coluna :deep(.trilho) {
  width: 100%;
}

.quantidade {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.categoria {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-left: 4px solid var(--cor);
}
</style>

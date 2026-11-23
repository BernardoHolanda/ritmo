<script setup>
import { ref } from 'vue'
import CabecalhoTela from '../components/CabecalhoTela.vue'
import { categorias } from '../data/constantes.js'
import { diasComRegistro } from '../controle/C-Historico.js'
import { consultar, listarRegras } from '../controle/C-PontuacaoSequencia.js'
import { formatarData } from '../utils/datas.js'

const resultado = ref(consultar())
const regras = listarRegras()
const ultimosDias = diasComRegistro(7)

const dias = (n) => `${n} ${n === 1 ? 'dia' : 'dias'}`
</script>

<template>
  <main class="tela">
    <CabecalhoTela titulo="Pontuação" subtitulo="Pontos e sequência" />

    <section class="cartao total" aria-label="Pontos acumulados">
      <p class="legenda">Pontos acumulados</p>
      <strong class="pontos">{{ resultado.pontos.toLocaleString('pt-BR') }}</strong>
    </section>

    <section class="sequencias" aria-label="Sequência de dias">
      <article class="cartao">
        <p class="legenda">Sequência atual</p>
        <strong class="numero">{{ dias(resultado.sequencia) }}</strong>
      </article>
      <article class="cartao">
        <p class="legenda">Recorde</p>
        <strong class="numero">{{ dias(resultado.recorde) }}</strong>
      </article>
    </section>

    <section class="cartao ultimos" aria-label="Últimos 7 dias">
      <h2>Últimos 7 dias</h2>
      <div class="bolinhas">
        <div v-for="d in ultimosDias" :key="d.dia" class="dia">
          <span class="bolinha" :class="{ ativa: d.registrou }" :aria-label="d.registrou ? 'Com registro' : 'Sem registro'">
            {{ d.registrou ? '✓' : '' }}
          </span>
          <span class="legenda">{{ formatarData(d.dia, { weekday: 'narrow' }) }}</span>
        </div>
      </div>
      <p v-if="resultado.sequencia === 0" class="legenda">Registre algo hoje para começar uma sequência.</p>
    </section>

    <section class="cartao regras" aria-labelledby="titulo-regras">
      <h2 id="titulo-regras">Como ganhar pontos</h2>
      <ul>
        <li v-for="regra in regras" :key="regra.idRegra" :style="{ '--cor': categorias[regra.acao].cor }">
          <span>{{ categorias[regra.acao].titulo }}</span>
          <strong>+{{ regra.pontos }}</strong>
        </li>
      </ul>
      <p class="legenda">A sequência conta os dias seguidos com pelo menos um registro.</p>
    </section>

    <RouterLink to="/retrospectiva" class="botao botao-bloco">Ver retrospectiva da semana</RouterLink>
  </main>
</template>

<style scoped>
h2 {
  font-size: 16px;
}

.total {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-top: 4px solid var(--marca);
}

.pontos {
  color: var(--marca-escura);
  font-size: 44px;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.sequencias {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.numero {
  font-size: 22px;
  font-variant-numeric: tabular-nums;
}

.ultimos,
.regras {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bolinhas {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.dia {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bolinha {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--superficie-2);
  color: #fff;
  font-size: 16px;
}

.bolinha.ativa {
  background: var(--marca);
}

ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding-left: 10px;
  border-left: 4px solid var(--cor);
}
</style>

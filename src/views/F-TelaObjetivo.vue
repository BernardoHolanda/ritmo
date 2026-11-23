<script setup>
import { ref } from 'vue'
import CabecalhoTela from '../components/CabecalhoTela.vue'
import { tiposObjetivo } from '../data/constantes.js'
import { definirObjetivo, objetivoAtivo } from '../controle/C-Objetivo.js'
import { consultarMetas } from '../controle/C-Metas.js'

const metas = ref(objetivoAtivo.value ? consultarMetas() : null)
const acabouDeDefinir = ref(false)

function selecionarObjetivo(tipo) {
  definirObjetivo(tipo)
  metas.value = consultarMetas()
  acabouDeDefinir.value = true
}
</script>

<template>
  <main class="tela">
    <CabecalhoTela titulo="Seu objetivo" subtitulo="Objetivo principal" />
    <p class="legenda">
      Escolha o que você quer alcançar. As metas da semana são geradas a partir do objetivo e do seu histórico.
    </p>

    <div class="opcoes" role="radiogroup" aria-label="Objetivo principal">
      <button
        v-for="opcao in tiposObjetivo"
        :key="opcao.tipo"
        type="button"
        role="radio"
        class="cartao opcao"
        :class="{ escolhida: objetivoAtivo?.tipo === opcao.tipo }"
        :aria-checked="objetivoAtivo?.tipo === opcao.tipo"
        @click="selecionarObjetivo(opcao.tipo)"
      >
        <strong>{{ opcao.titulo }}</strong>
        <span class="legenda">{{ opcao.descricao }}</span>
      </button>
    </div>

    <section v-if="metas" class="cartao metas" aria-labelledby="titulo-metas">
      <h2 id="titulo-metas">{{ acabouDeDefinir ? 'Metas geradas para esta semana' : 'Metas desta semana' }}</h2>
      <ul>
        <li v-for="meta in metas" :key="meta.idMeta">
          {{ meta.descricao }}: <strong>{{ meta.valorAlvo }} {{ meta.unidade }}</strong>
        </li>
      </ul>
      <RouterLink to="/metas" class="botao botao-primario botao-bloco">Acompanhar metas</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.opcoes {
  display: grid;
  gap: 10px;
}

.opcao {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.opcao strong {
  font-size: 16px;
}

.escolhida {
  border: 2px solid var(--marca);
  background: var(--superficie-2);
}

.opcao:focus-visible {
  outline: 2px solid var(--marca);
  outline-offset: 2px;
}

.metas {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h2 {
  font-size: 16px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding-left: 18px;
}
</style>

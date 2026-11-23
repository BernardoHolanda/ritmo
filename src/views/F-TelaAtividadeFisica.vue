<script setup>
import { computed, reactive } from 'vue'
import OpcoesEscolha from '../components/OpcoesEscolha.vue'
import RegistroFluxo from '../components/RegistroFluxo.vue'
import * as controle from '../controle/C-RegistroAtividadeFisica.js'
import { categorias, intensidades, modalidades } from '../data/mock.js'

const vazio = () => ({ modalidade: null, duracaoMin: '', intensidade: null, observacao: '' })
const dados = reactive(vazio())

const opcoesModalidade = modalidades.map((m) => ({ valor: m, rotulo: m }))
const opcoesIntensidade = intensidades.map((i) => ({ valor: i, rotulo: i }))
const atalhosDuracao = [15, 30, 45, 60].map((m) => ({ valor: m, rotulo: `${m} min` }))

const resumo = computed(() => [
  ['Modalidade', dados.modalidade],
  ['Duração', `${dados.duracaoMin} min`],
  ['Intensidade', dados.intensidade],
  ...(dados.observacao.trim() ? [['Observação', dados.observacao.trim()]] : []),
])
</script>

<template>
  <RegistroFluxo
    :controle="controle"
    :titulo="categorias.atividade.titulo"
    :cor="categorias.atividade.cor"
    :dados="dados"
    :resumo="resumo"
    @reiniciar="Object.assign(dados, vazio())"
  >
    <OpcoesEscolha v-model="dados.modalidade" rotulo="Modalidade" :opcoes="opcoesModalidade" />
    <OpcoesEscolha v-model="dados.duracaoMin" rotulo="Duração" :opcoes="atalhosDuracao" />
    <label class="rotulo">
      Ou digite os minutos
      <input v-model.number="dados.duracaoMin" class="campo" type="number" inputmode="numeric" min="1" max="600" />
    </label>
    <OpcoesEscolha v-model="dados.intensidade" rotulo="Intensidade" :opcoes="opcoesIntensidade" />
    <label class="rotulo">
      Observação (opcional)
      <textarea v-model="dados.observacao" class="campo" maxlength="280" />
    </label>
  </RegistroFluxo>
</template>

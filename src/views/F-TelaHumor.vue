<script setup>
import { computed, reactive } from 'vue'
import OpcoesEscolha from '../components/OpcoesEscolha.vue'
import RegistroFluxo from '../components/RegistroFluxo.vue'
import { categorias, niveisHumor } from '../data/mock.js'

const vazio = () => ({ nivel: null, observacao: '' })
const dados = reactive(vazio())

const opcoesHumor = niveisHumor.map((h) => ({ valor: h.nivel, rotulo: h.rotulo, emoji: h.emoji }))

const resumo = computed(() => {
  const humor = niveisHumor.find((h) => h.nivel === dados.nivel)
  return [
    ['Humor', humor ? `${humor.emoji} ${humor.rotulo}` : ''],
    ...(dados.observacao.trim() ? [['Observação', dados.observacao.trim()]] : []),
  ]
})
</script>

<template>
  <RegistroFluxo
    categoria="humor"
    :titulo="categorias.humor.titulo"
    :cor="categorias.humor.cor"
    :dados="dados"
    :resumo="resumo"
    @reiniciar="Object.assign(dados, vazio())"
  >
    <OpcoesEscolha v-model="dados.nivel" rotulo="Como você está se sentindo?" :opcoes="opcoesHumor" grande />
    <label class="rotulo">
      Observação (opcional)
      <textarea v-model="dados.observacao" class="campo" maxlength="280" placeholder="Algo que influenciou seu humor?" />
    </label>
  </RegistroFluxo>
</template>

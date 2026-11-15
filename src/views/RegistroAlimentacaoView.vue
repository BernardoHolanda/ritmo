<script setup>
import { computed, reactive } from 'vue'
import OpcoesEscolha from '../components/OpcoesEscolha.vue'
import RegistroFluxo from '../components/RegistroFluxo.vue'
import { categorias, tiposRefeicao } from '../data/mock.js'

const vazio = () => ({ tipoRefeicao: null, descricao: '', observacao: '' })
const dados = reactive(vazio())

const opcoesRefeicao = tiposRefeicao.map((t) => ({ valor: t, rotulo: t }))

const resumo = computed(() => [
  ['Refeição', dados.tipoRefeicao],
  ['O que comeu', dados.descricao.trim()],
  ...(dados.observacao.trim() ? [['Observação', dados.observacao.trim()]] : []),
])
</script>

<template>
  <RegistroFluxo
    categoria="alimentacao"
    :titulo="categorias.alimentacao.titulo"
    :cor="categorias.alimentacao.cor"
    :dados="dados"
    :resumo="resumo"
    @reiniciar="Object.assign(dados, vazio())"
  >
    <OpcoesEscolha v-model="dados.tipoRefeicao" rotulo="Refeição" :opcoes="opcoesRefeicao" />
    <label class="rotulo">
      O que você comeu?
      <textarea
        v-model="dados.descricao"
        class="campo"
        maxlength="280"
        placeholder="Ex.: arroz, feijão, frango e salada"
      />
    </label>
    <label class="rotulo">
      Observação (opcional)
      <textarea v-model="dados.observacao" class="campo" maxlength="280" />
    </label>
  </RegistroFluxo>
</template>

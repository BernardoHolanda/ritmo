<script setup>
import { computed, reactive } from 'vue'
import OpcoesEscolha from '../components/OpcoesEscolha.vue'
import RegistroFluxo from '../components/RegistroFluxo.vue'
import { categorias, qualidadesSono } from '../data/mock.js'

const vazio = () => ({ duracaoHoras: '', qualidade: null, horaDormir: '', horaAcordar: '', observacao: '' })
const dados = reactive(vazio())

const atalhosHoras = [5, 6, 7, 8, 9].map((h) => ({ valor: h, rotulo: `${h}h` }))
const opcoesQualidade = qualidadesSono.map((q) => ({ valor: q.valor, rotulo: q.rotulo, emoji: q.emoji }))

const resumo = computed(() => {
  const qualidade = qualidadesSono.find((q) => q.valor === dados.qualidade)
  return [
    ['Horas dormidas', `${String(dados.duracaoHoras).replace('.', ',')} h`],
    ['Qualidade', qualidade ? `${qualidade.emoji} ${qualidade.rotulo}` : ''],
    ...(dados.horaDormir ? [['Dormiu às', dados.horaDormir]] : []),
    ...(dados.horaAcordar ? [['Acordou às', dados.horaAcordar]] : []),
    ...(dados.observacao.trim() ? [['Observação', dados.observacao.trim()]] : []),
  ]
})
</script>

<template>
  <RegistroFluxo
    categoria="sono"
    :titulo="categorias.sono.titulo"
    :cor="categorias.sono.cor"
    :dados="dados"
    :resumo="resumo"
    @reiniciar="Object.assign(dados, vazio())"
  >
    <OpcoesEscolha v-model="dados.duracaoHoras" rotulo="Quantas horas você dormiu?" :opcoes="atalhosHoras" />
    <label class="rotulo">
      Ou digite as horas
      <input v-model.number="dados.duracaoHoras" class="campo" type="number" inputmode="decimal" min="0.5" max="16" step="0.5" />
    </label>
    <OpcoesEscolha v-model="dados.qualidade" rotulo="Como foi o sono?" :opcoes="opcoesQualidade" grande />
    <div class="horarios">
      <label class="rotulo">
        Dormiu às (opcional)
        <input v-model="dados.horaDormir" class="campo" type="time" />
      </label>
      <label class="rotulo">
        Acordou às (opcional)
        <input v-model="dados.horaAcordar" class="campo" type="time" />
      </label>
    </div>
    <label class="rotulo">
      Observação (opcional)
      <textarea v-model="dados.observacao" class="campo" maxlength="280" />
    </label>
  </RegistroFluxo>
</template>

<style scoped>
.horarios {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>

<script setup>
import { ref, watch } from 'vue'
import CabecalhoTela from './CabecalhoTela.vue'

const props = defineProps({
  // módulo C-Registro* da tela: precisa ter validarCamposEssenciais(dados) e registrar(dados)
  controle: { type: Object, required: true },
  titulo: { type: String, required: true },
  cor: { type: String, required: true },
  dados: { type: Object, required: true },
  resumo: { type: Array, required: true },
})
const emit = defineEmits(['reiniciar'])

const etapa = ref('preenchimento')
const erro = ref('')
const resultado = ref(null)

watch(() => props.dados, () => (erro.value = ''), { deep: true })

function revisar() {
  erro.value = props.controle.validarCamposEssenciais(props.dados)
  if (!erro.value) etapa.value = 'revisao'
}

function confirmar() {
  const retorno = props.controle.registrar(props.dados)
  if (retorno.erro) {
    erro.value = retorno.erro
    etapa.value = 'preenchimento'
    return
  }
  resultado.value = retorno
  etapa.value = 'salvo'
}

function registrarOutro() {
  resultado.value = null
  etapa.value = 'preenchimento'
  emit('reiniciar')
}
</script>

<template>
  <main class="tela" :style="{ '--cor': cor }">
    <CabecalhoTela :titulo="titulo" subtitulo="Registrar" voltar="/registrar" />

    <form v-if="etapa === 'preenchimento'" class="cartao formulario" novalidate @submit.prevent="revisar">
      <slot />
      <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
      <button type="submit" class="botao botao-primario botao-bloco">Revisar</button>
    </form>

    <section v-else-if="etapa === 'revisao'" class="cartao formulario" aria-labelledby="titulo-resumo">
      <h2 id="titulo-resumo">Confira antes de salvar</h2>
      <dl class="resumo">
        <div v-for="[rotulo, valor] in resumo" :key="rotulo" class="linha-resumo">
          <dt>{{ rotulo }}</dt>
          <dd>{{ valor }}</dd>
        </div>
      </dl>
      <div class="acoes">
        <button type="button" class="botao" @click="etapa = 'preenchimento'">Corrigir</button>
        <button type="button" class="botao botao-primario" @click="confirmar">Confirmar</button>
      </div>
    </section>

    <section v-else class="cartao confirmacao" role="status">
      <p class="selo" aria-hidden="true">✓</p>
      <h2>Registro salvo</h2>
      <p class="pontos">+{{ resultado.pontos }} pontos</p>
      <p class="legenda">
        Sequência de {{ resultado.sequencia }} {{ resultado.sequencia === 1 ? 'dia' : 'dias' }} com registro.
      </p>
      <div class="acoes">
        <button type="button" class="botao" @click="registrarOutro">Novo registro</button>
        <RouterLink to="/" class="botao botao-primario">Ver meu dia</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-top: 4px solid var(--cor);
}

h2 {
  font-size: 18px;
}

.resumo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
}

.linha-resumo {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--superficie-2);
}

dt {
  color: var(--tinta-2);
}

dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}

.acoes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.confirmacao {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.selo {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--cor);
  color: #fff;
  font-size: 28px;
}

.pontos {
  color: var(--ok);
  font-size: 22px;
  font-weight: 700;
}

.confirmacao .acoes {
  width: 100%;
  margin-top: 8px;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BarraProgresso from '../components/BarraProgresso.vue'
import CabecalhoTela from '../components/CabecalhoTela.vue'
import { calcularProgresso } from '../controle/progresso.js'
import { encerrarSessao, usuarioAtual } from '../controle/usuario.js'

const router = useRouter()
const progresso = ref(calcularProgresso())
const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
const primeiroNome = usuarioAtual.value.nome.split(' ')[0]

function texto(item) {
  if (item.categoria === 'humor') return item.registros.at(-1).emoji
  return `${item.valor.toLocaleString('pt-BR')} / ${item.alvo} ${item.unidade}`
}

function sair() {
  encerrarSessao()
  router.push('/entrar')
}
</script>

<template>
  <main class="tela">
    <CabecalhoTela :titulo="`Olá, ${primeiroNome}`" :subtitulo="hoje">
      <button type="button" class="botao sair" @click="sair">Sair</button>
    </CabecalhoTela>

    <section class="categorias" aria-label="Progresso de hoje">
      <article v-for="item in progresso" :key="item.categoria" class="cartao categoria" :style="{ '--cor': item.cor }">
        <header class="topo">
          <h2>{{ item.titulo }}</h2>
          <span v-if="!item.vazio" class="valor">{{ texto(item) }}</span>
        </header>
        <template v-if="item.vazio">
          <p class="legenda">Sem registro hoje.</p>
          <RouterLink :to="`/registrar/${item.categoria}`" class="registrar">Registrar agora</RouterLink>
        </template>
        <BarraProgresso v-else :percentual="item.percentual" :cor="item.cor" />
      </article>
    </section>
  </main>
</template>

<style scoped>
.sair {
  min-height: 36px;
  padding: 0 14px;
  font-size: 14px;
}

.categorias {
  display: grid;
  gap: 12px;
}

.categoria {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-left: 4px solid var(--cor);
}

.topo {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

h2 {
  font-size: 16px;
}

.valor {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.registrar {
  align-self: flex-start;
  color: var(--cor);
  font-size: 14px;
  font-weight: 600;
}
</style>

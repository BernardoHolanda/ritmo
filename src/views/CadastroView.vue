<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CabecalhoTela from '../components/CabecalhoTela.vue'
import { cadastrar } from '../controle/usuario.js'

const router = useRouter()
const dados = reactive({ nome: '', email: '', senha: '', dataNascimento: '' })
const erro = ref('')

function enviar() {
  const retorno = cadastrar(dados)
  if (retorno.erro) {
    erro.value = retorno.erro
    return
  }
  router.push('/objetivo')
}
</script>

<template>
  <main class="tela">
    <CabecalhoTela titulo="Criar conta" subtitulo="Ritmo" voltar="/entrar" />

    <form class="cartao formulario" novalidate @submit.prevent="enviar">
      <label class="rotulo">
        Nome
        <input v-model="dados.nome" class="campo" autocomplete="name" required />
      </label>
      <label class="rotulo">
        E-mail
        <input v-model="dados.email" class="campo" type="email" autocomplete="email" required />
      </label>
      <label class="rotulo">
        Senha
        <input v-model="dados.senha" class="campo" type="password" autocomplete="new-password" minlength="6" required />
      </label>
      <label class="rotulo">
        Data de nascimento
        <input v-model="dados.dataNascimento" class="campo" type="date" required />
      </label>
      <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
      <button type="submit" class="botao botao-primario botao-bloco">Cadastrar</button>
    </form>
  </main>
</template>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usuarios } from '../data/mock.js'
import { objetivoAtivo } from '../controle/C-Objetivo.js'
import { autenticar } from '../controle/C-Autenticacao.js'

const router = useRouter()
const credenciais = reactive({ email: '', senha: '' })
const erro = ref('')
const exemplo = usuarios[0]

function entrar() {
  const retorno = autenticar(credenciais.email, credenciais.senha)
  if (retorno.erro) {
    erro.value = retorno.erro
    return
  }
  router.push(objetivoAtivo.value ? '/' : '/objetivo')
}

function usarExemplo() {
  credenciais.email = exemplo.email
  credenciais.senha = exemplo.senha
}
</script>

<template>
  <main class="tela entrada">
    <div class="marca">
      <img src="/logo.svg" alt="" width="64" height="64" />
      <h1>Ritmo</h1>
      <p class="legenda">Exercício, alimentação e descanso num só lugar.</p>
    </div>

    <form class="cartao formulario" novalidate @submit.prevent="entrar">
      <label class="rotulo">
        E-mail
        <input v-model="credenciais.email" class="campo" type="email" autocomplete="email" required />
      </label>
      <label class="rotulo">
        Senha
        <input v-model="credenciais.senha" class="campo" type="password" autocomplete="current-password" required />
      </label>
      <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
      <button type="submit" class="botao botao-primario botao-bloco">Entrar</button>
    </form>

    <p class="rodape">
      Ainda não tem conta? <RouterLink to="/cadastro">Cadastre-se</RouterLink>
    </p>
    <button type="button" class="exemplo" @click="usarExemplo">
      Usar conta de teste ({{ exemplo.email }})
    </button>
  </main>
</template>

<style scoped>
.entrada {
  justify-content: center;
  min-height: 100dvh;
  padding-bottom: 32px;
}

.marca {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  text-align: center;
}

.marca img {
  border-radius: 16px;
}

.marca h1 {
  font-size: 32px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rodape {
  text-align: center;
}

.exemplo {
  border: 0;
  background: none;
  color: var(--tinta-3);
  font: inherit;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
}
</style>

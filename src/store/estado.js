import { reactive, watch } from 'vue'
import { seed } from '../data/seed.js'

// Os dados ficam no arquivo dados/ritmo.json, lido e gravado pelo servidor do
// Vite em /api/dados (veja servidor/arquivo-dados.js). Só a sessão (quem está
// logado) fica no navegador, para cada aparelho ter o seu login.
const ENDERECO = '/api/dados'
const CHAVE_SESSAO = 'ritmo:sessao'

export const estado = reactive({ ...seed(), sessao: null })

function lerSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO))
  } catch {
    return null
  }
}

function gravarSessao(sessao) {
  try {
    if (sessao) localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
    else localStorage.removeItem(CHAVE_SESSAO)
  } catch {
    return
  }
}

function dadosSemSessao() {
  const { sessao, ...dados } = estado
  return dados
}

function enviar(keepalive = false) {
  return fetch(ENDERECO, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosSemSessao()),
    keepalive,
  })
}

// Grava um envio por vez, para um mais antigo nunca chegar depois de um mais novo.
let enviando = false
let pendente = false
function salvarNoArquivo() {
  if (enviando) {
    pendente = true
    return
  }
  enviando = true
  enviar()
    .catch((e) => console.error('Não deu para salvar os dados:', e))
    .finally(() => {
      enviando = false
      if (pendente) {
        pendente = false
        salvarNoArquivo()
      }
    })
}

export async function carregarDados() {
  try {
    const resposta = await fetch(ENDERECO, { cache: 'no-store' })
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)
    Object.assign(estado, await resposta.json())
  } catch (e) {
    console.error('Não deu para ler dados/ritmo.json; usando só o seed, sem salvar.', e)
    return
  } finally {
    const sessao = lerSessao()
    estado.sessao = estado.usuarios.some((u) => u.idUsuario === sessao?.idUsuario) ? sessao : null
    watch(() => estado.sessao, gravarSessao)
  }
  watch(dadosSemSessao, salvarNoArquivo, { deep: true })
  // Se a página fechar com uma gravação na fila, manda já a versão final.
  addEventListener('pagehide', () => pendente && enviar(true))
}

export function novoId() {
  return estado.proximoId++
}

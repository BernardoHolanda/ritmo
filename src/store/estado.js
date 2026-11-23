import { reactive, watch } from 'vue'
import { seed } from '../data/seed.js'

const CHAVE = 'ritmo:dados'

function estadoInicial() {
  return { ...seed(), sessao: null }
}

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE))
    return salvo?.usuarios ? salvo : estadoInicial()
  } catch {
    return estadoInicial()
  }
}

export const estado = reactive(carregar())

watch(
  estado,
  (valor) => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(valor))
    } catch {
      return
    }
  },
  { deep: true, immediate: true },
)

export function novoId() {
  return estado.proximoId++
}

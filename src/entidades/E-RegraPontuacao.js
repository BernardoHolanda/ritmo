import { estado } from '../store/estado.js'

export function calcularPontos(registro) {
  const regra = estado.regras.find((r) => r.ativa && r.acao === registro.categoria)
  return regra ? regra.pontos : 0
}

export function listarAtivas() {
  return estado.regras.filter((r) => r.ativa)
}

import { estado } from '../store/estado.js'

export function criar(idUsuario) {
  estado.pontuacoes.push({ idUsuario, total: 0, ultimaAtualizacao: null })
  return estado.pontuacoes.at(-1)
}

export function doUsuario(idUsuario) {
  return estado.pontuacoes.find((p) => p.idUsuario === idUsuario)
}

export function adicionarPontos(pontuacao, pontos, dataHora) {
  pontuacao.total += pontos
  pontuacao.ultimaAtualizacao = dataHora
}

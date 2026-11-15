import { estado } from '../store/estado.js'
import { avancarSequencia, calcularPontos, sequenciaInterrompida } from '../store/regras.js'
import { usuarioAtual } from './usuario.js'

function dadosDoUsuario(idUsuario) {
  return {
    pontuacao: estado.pontuacoes.find((p) => p.idUsuario === idUsuario),
    sequencia: estado.sequencias.find((s) => s.idUsuario === idUsuario),
  }
}

export function atualizar(registro) {
  const { pontuacao, sequencia } = dadosDoUsuario(registro.idUsuario)
  const pontos = calcularPontos(registro, estado.regras)
  pontuacao.total += pontos
  pontuacao.ultimaAtualizacao = registro.dataHora
  Object.assign(sequencia, avancarSequencia(sequencia, registro.dataHora.slice(0, 10)))
  return { pontos, sequencia: sequencia.atual }
}

export function consultar(idUsuario = usuarioAtual.value?.idUsuario) {
  const { pontuacao, sequencia } = dadosDoUsuario(idUsuario)
  if (sequenciaInterrompida(sequencia)) sequencia.atual = 0
  return { pontos: pontuacao.total, sequencia: sequencia.atual, recorde: sequencia.recorde }
}

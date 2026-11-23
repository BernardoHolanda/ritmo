import * as Pontuacao from '../entidades/E-Pontuacao.js'
import * as RegraPontuacao from '../entidades/E-RegraPontuacao.js'
import * as Sequencia from '../entidades/E-Sequencia.js'
import { usuarioAtual } from './C-Autenticacao.js'

// Chamado depois de cada registro salvo: soma os pontos e avança a sequência.
export function atualizar(registro) {
  const pontuacao = Pontuacao.doUsuario(registro.idUsuario)
  const sequencia = Sequencia.doUsuario(registro.idUsuario)
  const pontos = RegraPontuacao.calcularPontos(registro)
  Pontuacao.adicionarPontos(pontuacao, pontos, registro.dataHora)
  Sequencia.atualizar(sequencia, registro.dataHora.slice(0, 10))
  registro.status = 'contabilizado'
  return { pontos, sequencia: sequencia.atual }
}

export function consultar(idUsuario = usuarioAtual.value?.idUsuario) {
  const pontuacao = Pontuacao.doUsuario(idUsuario)
  const sequencia = Sequencia.doUsuario(idUsuario)
  Sequencia.interromper(sequencia)
  return { pontos: pontuacao.total, sequencia: sequencia.atual, recorde: sequencia.recorde }
}

// Regras que dão pontos hoje (para a tela de pontuação explicar como ganhar).
export function listarRegras() {
  return RegraPontuacao.listarAtivas()
}

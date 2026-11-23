import * as Meta from '../entidades/E-Meta.js'
import * as Objetivo from '../entidades/E-Objetivo.js'
import * as Registro from '../entidades/E-Registro.js'
import * as Retrospectiva from '../entidades/E-Retrospectiva.js'
import { adicionarDias, dataISO, fimDaSemana, inicioDaSemana } from '../utils/datas.js'
import { usuarioAtual } from './C-Autenticacao.js'

// deslocamento 0 = esta semana, -1 = semana passada, e assim por diante.
export function periodoDaSemana(deslocamento = 0, hoje = new Date()) {
  const referencia = adicionarDias(hoje, deslocamento * 7)
  return { inicio: dataISO(inicioDaSemana(referencia)), fim: dataISO(fimDaSemana(referencia)) }
}

function resumirMetas(inicio, registros, hoje) {
  const idUsuario = usuarioAtual.value?.idUsuario
  const idsObjetivos = Objetivo.listarPorUsuario(idUsuario).map((o) => o.idObjetivo)
  const metas = idsObjetivos
    .flatMap(Meta.listarPorObjetivo)
    .filter((m) => m.dataInicio === inicio && m.status !== 'cancelada')
    .map((m) => Meta.atualizarProgresso(m, registros, hoje))
  return { total: metas.length, cumpridas: metas.filter((m) => m.status === 'cumprida').length }
}

export function gerar(deslocamento = 0, hoje = new Date()) {
  const { inicio, fim } = periodoDaSemana(deslocamento, hoje)
  const registros = Registro.listarPorPeriodo(inicio, fim, usuarioAtual.value?.idUsuario)
  return {
    ...Retrospectiva.gerar(registros, inicio, fim),
    metas: resumirMetas(inicio, registros, hoje),
    atual: deslocamento === 0,
  }
}

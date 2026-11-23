import { categorias } from '../data/constantes.js'
import * as Meta from '../entidades/E-Meta.js'
import * as Registro from '../entidades/E-Registro.js'
import { dataISO } from '../utils/datas.js'
import { usuarioAtual } from './C-Autenticacao.js'
import { historicoRecente, objetivoAtivo } from './C-Objetivo.js'

const ordem = Object.keys(categorias)

export function consultarMetas(hoje = new Date()) {
  const objetivo = objetivoAtivo.value
  if (!objetivo) return null
  const dia = dataISO(hoje)
  let atuais = Meta.listarPorObjetivo(objetivo.idObjetivo).filter(
    (m) => m.status !== 'cancelada' && m.dataInicio <= dia && m.dataFim >= dia,
  )
  // Semana nova: gera as metas desta semana a partir do histórico.
  if (!atuais.length) atuais = Meta.gerar(objetivo, historicoRecente(hoje), hoje)
  const registros = Registro.listarPorPeriodo(atuais[0].dataInicio, atuais[0].dataFim, usuarioAtual.value.idUsuario)
  return atuais
    .map((m) => Meta.atualizarProgresso(m, registros, hoje))
    .sort((a, b) => ordem.indexOf(a.categoria) - ordem.indexOf(b.categoria))
}

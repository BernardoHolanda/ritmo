import { categorias } from '../data/mock.js'
import { estado, novoId } from '../store/estado.js'
import { atualizarProgresso, gerarMetas } from '../store/regras.js'
import { dataISO } from '../utils/datas.js'
import { historicoRecente, objetivoAtivo } from './objetivo.js'
import { listarPorPeriodo } from './registros.js'

const ordem = Object.keys(categorias)

export function consultarMetas(hoje = new Date()) {
  const objetivo = objetivoAtivo.value
  if (!objetivo) return null
  const dia = dataISO(hoje)
  const doObjetivo = estado.metas.filter((m) => m.idObjetivo === objetivo.idObjetivo && m.status !== 'cancelada')
  let atuais = doObjetivo.filter((m) => m.dataInicio <= dia && m.dataFim >= dia)
  if (!atuais.length) {
    estado.metas.push(...gerarMetas(objetivo, historicoRecente(hoje), hoje).map((m) => ({ idMeta: novoId(), ...m })))
    atuais = estado.metas.filter((m) => m.idObjetivo === objetivo.idObjetivo && m.dataInicio <= dia && m.dataFim >= dia)
  }
  const registros = listarPorPeriodo(atuais[0].dataInicio, atuais[0].dataFim)
  return atuais
    .map((m) => atualizarProgresso(m, registros, hoje))
    .sort((a, b) => ordem.indexOf(a.categoria) - ordem.indexOf(b.categoria))
}

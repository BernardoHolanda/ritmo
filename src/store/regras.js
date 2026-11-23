import { modelosMeta } from '../data/constantes.js'
import { adicionarDias, dataISO, deISO, fimDaSemana, inicioDaSemana } from '../utils/datas.js'

export function calcularPontos(registro, regras) {
  const regra = regras.find((r) => r.ativa && r.acao === registro.categoria)
  return regra ? regra.pontos : 0
}

export function avancarSequencia(sequencia, dia) {
  if (sequencia.ultimoDiaValido === dia) return sequencia
  const ontem = dataISO(adicionarDias(deISO(dia), -1))
  const atual = sequencia.ultimoDiaValido === ontem && sequencia.atual > 0 ? sequencia.atual + 1 : 1
  return { ...sequencia, atual, recorde: Math.max(sequencia.recorde, atual), ultimoDiaValido: dia }
}

export function sequenciaInterrompida(sequencia, hoje = new Date()) {
  if (!sequencia.ultimoDiaValido || sequencia.atual === 0) return false
  return sequencia.ultimoDiaValido < dataISO(adicionarDias(hoje, -1))
}

export function medirCategoria(categoria, registros) {
  const daCategoria = registros.filter((r) => r.categoria === categoria)
  if (categoria === 'atividade') return daCategoria.reduce((soma, r) => soma + r.duracaoMin, 0)
  if (categoria === 'sono') return daCategoria.filter((r) => r.duracaoHoras >= 7).length
  if (categoria === 'alimentacao') return daCategoria.length
  return new Set(daCategoria.map((r) => r.dataHora.slice(0, 10))).size
}

export function gerarMetas(objetivo, historico, hoje = new Date()) {
  const semanas = Math.max(1, new Set(historico.map((r) => dataISO(inicioDaSemana(deISO(r.dataHora))))).size)
  return modelosMeta[objetivo.tipo].map((modelo) => {
    const mediaSemanal = medirCategoria(modelo.categoria, historico) / semanas
    const teto = modelo.categoria === 'sono' || modelo.categoria === 'humor' ? 7 : Infinity
    const valorAlvo = Math.min(teto, mediaSemanal > modelo.valorAlvo ? Math.ceil(mediaSemanal * 1.1) : modelo.valorAlvo)
    return {
      idObjetivo: objetivo.idObjetivo,
      categoria: modelo.categoria,
      descricao: modelo.descricao,
      valorAlvo,
      progresso: 0,
      unidade: modelo.unidade,
      dataInicio: dataISO(inicioDaSemana(hoje)),
      dataFim: dataISO(fimDaSemana(hoje)),
      status: 'ativa',
    }
  })
}

export function atualizarProgresso(meta, registros, hoje = new Date()) {
  if (meta.status === 'cancelada') return meta
  const doPeriodo = registros.filter((r) => {
    const dia = r.dataHora.slice(0, 10)
    return dia >= meta.dataInicio && dia <= meta.dataFim
  })
  meta.progresso = medirCategoria(meta.categoria, doPeriodo)
  if (meta.progresso >= meta.valorAlvo) meta.status = 'cumprida'
  else if (dataISO(hoje) > meta.dataFim) meta.status = 'expirada'
  else meta.status = 'ativa'
  return meta
}

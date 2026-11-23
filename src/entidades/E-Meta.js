import { modelosMeta } from '../data/constantes.js'
import { estado, novoId } from '../store/estado.js'
import { dataISO, deISO, fimDaSemana, inicioDaSemana } from '../utils/datas.js'

// Quanto os registros somam para a meta de uma categoria.
function medir(categoria, registros) {
  const daCategoria = registros.filter((r) => r.categoria === categoria)
  if (categoria === 'atividade') return daCategoria.reduce((soma, r) => soma + r.duracaoMin, 0)
  if (categoria === 'sono') return daCategoria.filter((r) => r.duracaoHoras >= 7).length
  if (categoria === 'alimentacao') return daCategoria.length
  return new Set(daCategoria.map((r) => r.dataHora.slice(0, 10))).size
}

// Cria as metas da semana de um objetivo, ajustando o alvo pela média do histórico.
export function gerar(objetivo, historico, hoje = new Date()) {
  const semanas = Math.max(1, new Set(historico.map((r) => dataISO(inicioDaSemana(deISO(r.dataHora))))).size)
  const metas = modelosMeta[objetivo.tipo].map((modelo) => {
    const mediaSemanal = medir(modelo.categoria, historico) / semanas
    const teto = modelo.categoria === 'sono' || modelo.categoria === 'humor' ? 7 : Infinity
    const valorAlvo = Math.min(teto, mediaSemanal > modelo.valorAlvo ? Math.ceil(mediaSemanal * 1.1) : modelo.valorAlvo)
    return {
      idMeta: novoId(),
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
  estado.metas.push(...metas)
  return listarPorObjetivo(objetivo.idObjetivo).slice(-metas.length)
}

export function listarPorObjetivo(idObjetivo) {
  return estado.metas.filter((m) => m.idObjetivo === idObjetivo)
}

export function atualizarProgresso(meta, registros, hoje = new Date()) {
  if (meta.status === 'cancelada') return meta
  const doPeriodo = registros.filter((r) => {
    const dia = r.dataHora.slice(0, 10)
    return dia >= meta.dataInicio && dia <= meta.dataFim
  })
  meta.progresso = medir(meta.categoria, doPeriodo)
  if (meta.progresso >= meta.valorAlvo) meta.status = 'cumprida'
  else if (dataISO(hoje) > meta.dataFim) meta.status = 'expirada'
  else meta.status = 'ativa'
  return meta
}

export function cancelar(meta) {
  if (meta.status === 'ativa') meta.status = 'cancelada'
}

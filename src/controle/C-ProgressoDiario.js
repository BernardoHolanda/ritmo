import { categorias } from '../data/constantes.js'
import * as Registro from '../entidades/E-Registro.js'
import { dataISO } from '../utils/datas.js'
import { usuarioAtual } from './C-Autenticacao.js'
import { consultarMetas } from './C-Metas.js'

const alvoDiarioPadrao = { atividade: 30, sono: 7, alimentacao: 3, humor: 1 }

function alvoDiario(categoria, metas) {
  const meta = metas.find((m) => m.categoria === categoria)
  if (!meta || categoria === 'sono' || categoria === 'humor') return alvoDiarioPadrao[categoria]
  return Math.ceil(meta.valorAlvo / 7)
}

export function consolidarPorCategoria(registrosDoDia, metas) {
  return Object.entries(categorias).map(([categoria, info]) => {
    const registros = Registro.filtrarPorCategoria(registrosDoDia, categoria)
    const alvo = alvoDiario(categoria, metas)
    let valor = 0
    let unidade = ''
    if (categoria === 'atividade') {
      valor = registros.reduce((soma, r) => soma + r.duracaoMin, 0)
      unidade = 'min'
    } else if (categoria === 'sono') {
      valor = registros.at(-1)?.duracaoHoras ?? 0
      unidade = 'h'
    } else if (categoria === 'alimentacao') {
      valor = registros.length
      unidade = 'refeições'
    } else {
      valor = registros.length ? 1 : 0
    }
    return {
      categoria,
      titulo: info.titulo,
      cor: info.cor,
      registros,
      vazio: registros.length === 0,
      valor,
      alvo,
      unidade,
      percentual: Math.min(100, Math.round((valor / alvo) * 100)),
    }
  })
}

export function calcularProgresso(data = new Date()) {
  const dia = dataISO(data)
  return consolidarPorCategoria(Registro.listarPorPeriodo(dia, dia, usuarioAtual.value?.idUsuario), consultarMetas(data) ?? [])
}

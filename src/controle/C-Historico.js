import * as Registro from '../entidades/E-Registro.js'
import { adicionarDias, dataISO, formatarHora } from '../utils/datas.js'
import { usuarioAtual } from './C-Autenticacao.js'

// Resumo de uma linha de cada tipo de registro, para a lista do histórico.
export function descrever(registro) {
  if (registro.categoria === 'atividade') return `${registro.modalidade} · ${registro.duracaoMin} min · ${registro.intensidade}`
  if (registro.categoria === 'sono') return `${registro.duracaoHoras.toLocaleString('pt-BR')} h de sono`
  if (registro.categoria === 'alimentacao') return `${registro.tipoRefeicao}: ${registro.descricao}`
  return `${registro.emoji} Humor ${registro.nivel} de 5`
}

// Registros dos últimos `dias` dias (contando hoje), do mais novo para o mais antigo, agrupados por dia.
export function consultar(dias = 30, categoria = null, hoje = new Date()) {
  const inicio = dataISO(adicionarDias(hoje, -(dias - 1)))
  let registros = Registro.listarPorPeriodo(inicio, dataISO(hoje), usuarioAtual.value?.idUsuario)
  if (categoria) registros = Registro.filtrarPorCategoria(registros, categoria)
  const grupos = []
  for (const registro of [...registros].reverse()) {
    const dia = registro.dataHora.slice(0, 10)
    if (grupos.at(-1)?.dia !== dia) grupos.push({ dia, registros: [] })
    grupos.at(-1).registros.push({ ...registro, resumo: descrever(registro), hora: formatarHora(registro.dataHora) })
  }
  return grupos
}

// Para cada um dos últimos `dias` dias (do mais antigo ao mais novo): teve algum registro?
export function diasComRegistro(dias = 7, hoje = new Date()) {
  const inicio = dataISO(adicionarDias(hoje, -(dias - 1)))
  const registros = Registro.listarPorPeriodo(inicio, dataISO(hoje), usuarioAtual.value?.idUsuario)
  const comRegistro = new Set(registros.map((r) => r.dataHora.slice(0, 10)))
  return Array.from({ length: dias }, (_, i) => {
    const dia = dataISO(adicionarDias(hoje, -(dias - 1 - i)))
    return { dia, registrou: comRegistro.has(dia) }
  })
}

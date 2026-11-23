import { adicionarDias, dataISO, deISO } from '../utils/datas.js'
import * as Registro from './E-Registro.js'
import * as RegraPontuacao from './E-RegraPontuacao.js'

function media(valores) {
  return valores.length ? valores.reduce((soma, v) => soma + v, 0) / valores.length : 0
}

function diasDoPeriodo(inicio, fim) {
  const dias = []
  for (let d = deISO(inicio); dataISO(d) <= fim; d = adicionarDias(d, 1)) dias.push(dataISO(d))
  return dias
}

// Consolida os registros de um período (a semana) numa retrospectiva.
// Não é gravada no arquivo de dados: é calculada a partir dos registros.
export function gerar(registros, inicio, fim) {
  const atividade = Registro.filtrarPorCategoria(registros, 'atividade')
  const sono = Registro.filtrarPorCategoria(registros, 'sono')
  const alimentacao = Registro.filtrarPorCategoria(registros, 'alimentacao')
  const humor = Registro.filtrarPorCategoria(registros, 'humor')

  const porDia = diasDoPeriodo(inicio, fim).map((dia) => {
    const doDia = registros.filter((r) => r.dataHora.slice(0, 10) === dia)
    return { dia, quantidade: doDia.length, pontos: doDia.reduce((soma, r) => soma + RegraPontuacao.calcularPontos(r), 0) }
  })

  return {
    inicio,
    fim,
    totalRegistros: registros.length,
    diasComRegistro: porDia.filter((d) => d.quantidade > 0).length,
    pontos: porDia.reduce((soma, d) => soma + d.pontos, 0),
    porDia,
    atividade: { sessoes: atividade.length, minutos: atividade.reduce((soma, r) => soma + r.duracaoMin, 0) },
    sono: { noites: sono.length, mediaHoras: media(sono.map((r) => r.duracaoHoras)) },
    alimentacao: { refeicoes: alimentacao.length },
    humor: { dias: new Set(humor.map((r) => r.dataHora.slice(0, 10))).size, media: media(humor.map((r) => r.nivel)) },
  }
}

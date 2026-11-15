export function dataISO(data = new Date()) {
  const d = new Date(data)
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function dataHoraISO(data = new Date()) {
  const d = new Date(data)
  const hora = String(d.getHours()).padStart(2, '0')
  const minuto = String(d.getMinutes()).padStart(2, '0')
  return `${dataISO(d)}T${hora}:${minuto}`
}

export function deISO(texto) {
  const [ano, mes, dia] = texto.slice(0, 10).split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

export function adicionarDias(data, dias) {
  const d = new Date(data)
  d.setDate(d.getDate() + dias)
  return d
}

export function inicioDaSemana(data = new Date()) {
  const d = deISO(dataISO(data))
  const desdeSegunda = (d.getDay() + 6) % 7
  return adicionarDias(d, -desdeSegunda)
}

export function fimDaSemana(data = new Date()) {
  return adicionarDias(inicioDaSemana(data), 6)
}

export function formatarData(texto, opcoes = { day: '2-digit', month: '2-digit' }) {
  return deISO(texto).toLocaleDateString('pt-BR', opcoes)
}

export function formatarHora(texto) {
  return texto.slice(11, 16)
}

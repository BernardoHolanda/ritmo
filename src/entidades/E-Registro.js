import { estado, novoId } from '../store/estado.js'
import { dataHoraISO } from '../utils/datas.js'

// Parte comum a todo registro. Os campos de cada tipo vêm das subclasses
// E-RegistroAtividadeFisica, E-RegistroSono, E-RegistroAlimentacao e E-RegistroHumor.
export function criar(categoria, idUsuario, campos, observacao) {
  estado.registros.push({
    idRegistro: novoId(),
    idUsuario,
    categoria,
    dataHora: dataHoraISO(),
    observacao: observacao?.trim() ?? '',
    status: 'salvo',
    ...campos,
  })
  return estado.registros.at(-1)
}

export function listarPorPeriodo(inicio, fim, idUsuario) {
  return estado.registros
    .filter((r) => r.idUsuario === idUsuario)
    .filter((r) => {
      const dia = r.dataHora.slice(0, 10)
      return dia >= inicio && dia <= fim
    })
    .sort((a, b) => a.dataHora.localeCompare(b.dataHora))
}

export function filtrarPorCategoria(registros, categoria) {
  return registros.filter((r) => r.categoria === categoria)
}

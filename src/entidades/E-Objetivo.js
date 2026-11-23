import { tiposObjetivo } from '../data/constantes.js'
import { estado, novoId } from '../store/estado.js'
import { dataISO } from '../utils/datas.js'

export function obterAtivo(idUsuario) {
  return estado.objetivos.find((o) => o.ativo && o.idUsuario === idUsuario) ?? null
}

// Todos os objetivos do usuário, inclusive os antigos (a retrospectiva de semanas passadas usa).
export function listarPorUsuario(idUsuario) {
  return estado.objetivos.filter((o) => o.idUsuario === idUsuario)
}

export function criar(idUsuario, tipo) {
  estado.objetivos.push({
    idObjetivo: novoId(),
    idUsuario,
    tipo,
    descricao: tiposObjetivo.find((t) => t.tipo === tipo).titulo,
    dataDefinicao: dataISO(),
    ativo: true,
  })
  return estado.objetivos.at(-1)
}

export function desativar(objetivo) {
  objetivo.ativo = false
}

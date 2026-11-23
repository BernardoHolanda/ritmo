import { atualizar } from '../controle/C-PontuacaoSequencia.js'
import { usuarioAtual } from '../controle/C-Autenticacao.js'
import { dataHoraISO } from '../utils/datas.js'
import { estado, novoId } from './estado.js'

// Parte comum dos quatro C-Registro*: grava o E-Registro e soma pontos e sequência.
export function salvarRegistro(categoria, campos, observacao) {
  estado.registros.push({
    idRegistro: novoId(),
    idUsuario: usuarioAtual.value.idUsuario,
    categoria,
    dataHora: dataHoraISO(),
    observacao: observacao?.trim() ?? '',
    status: 'salvo',
    ...campos,
  })
  const registro = estado.registros.at(-1)
  const resultado = atualizar(registro)
  registro.status = 'contabilizado'
  return { registro, ...resultado }
}

export function listarPorPeriodo(inicio, fim, idUsuario = usuarioAtual.value?.idUsuario) {
  return estado.registros
    .filter((r) => r.idUsuario === idUsuario)
    .filter((r) => {
      const dia = r.dataHora.slice(0, 10)
      return dia >= inicio && dia <= fim
    })
    .sort((a, b) => a.dataHora.localeCompare(b.dataHora))
}

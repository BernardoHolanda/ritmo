import { estado } from '../store/estado.js'
import { adicionarDias, dataISO, deISO } from '../utils/datas.js'

export function criar(idUsuario) {
  estado.sequencias.push({ idUsuario, atual: 0, recorde: 0, ultimoDiaValido: null })
  return estado.sequencias.at(-1)
}

export function doUsuario(idUsuario) {
  return estado.sequencias.find((s) => s.idUsuario === idUsuario)
}

// Conta mais um dia se o último registro foi ontem; senão recomeça em 1.
export function atualizar(sequencia, dia) {
  if (sequencia.ultimoDiaValido === dia) return
  const ontem = dataISO(adicionarDias(deISO(dia), -1))
  sequencia.atual = sequencia.ultimoDiaValido === ontem && sequencia.atual > 0 ? sequencia.atual + 1 : 1
  sequencia.recorde = Math.max(sequencia.recorde, sequencia.atual)
  sequencia.ultimoDiaValido = dia
}

// Zera a sequência se passou um dia inteiro sem registro.
export function interromper(sequencia, hoje = new Date()) {
  if (!sequencia.ultimoDiaValido || sequencia.atual === 0) return
  if (sequencia.ultimoDiaValido < dataISO(adicionarDias(hoje, -1))) sequencia.atual = 0
}

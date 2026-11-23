import { computed } from 'vue'
import * as Meta from '../entidades/E-Meta.js'
import * as Objetivo from '../entidades/E-Objetivo.js'
import * as Registro from '../entidades/E-Registro.js'
import { adicionarDias, dataISO } from '../utils/datas.js'
import { usuarioAtual } from './C-Autenticacao.js'

export const objetivoAtivo = computed(() => Objetivo.obterAtivo(usuarioAtual.value?.idUsuario))

// Registros das últimas 4 semanas, usados para ajustar o alvo das metas.
export function historicoRecente(hoje = new Date()) {
  const inicio = dataISO(adicionarDias(hoje, -28))
  const fim = dataISO(adicionarDias(hoje, -1))
  return Registro.listarPorPeriodo(inicio, fim, usuarioAtual.value?.idUsuario)
}

export function desativarObjetivoAnterior() {
  const anterior = objetivoAtivo.value
  if (!anterior) return
  Objetivo.desativar(anterior)
  Meta.listarPorObjetivo(anterior.idObjetivo).forEach(Meta.cancelar)
}

export function definirObjetivo(tipo) {
  if (objetivoAtivo.value?.tipo === tipo) return objetivoAtivo.value
  desativarObjetivoAnterior()
  const objetivo = Objetivo.criar(usuarioAtual.value.idUsuario, tipo)
  Meta.gerar(objetivo, historicoRecente())
  return objetivo
}

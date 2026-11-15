import { computed } from 'vue'
import { tiposObjetivo } from '../data/mock.js'
import { estado, novoId } from '../store/estado.js'
import { gerarMetas } from '../store/regras.js'
import { adicionarDias, dataISO } from '../utils/datas.js'
import { listarPorPeriodo } from './registros.js'
import { usuarioAtual } from './usuario.js'

export const objetivoAtivo = computed(
  () => estado.objetivos.find((o) => o.ativo && o.idUsuario === usuarioAtual.value?.idUsuario) ?? null,
)

export function historicoRecente(hoje = new Date()) {
  return listarPorPeriodo(dataISO(adicionarDias(hoje, -28)), dataISO(adicionarDias(hoje, -1)))
}

export function desativarObjetivoAnterior() {
  const anterior = objetivoAtivo.value
  if (!anterior) return
  anterior.ativo = false
  estado.metas
    .filter((m) => m.idObjetivo === anterior.idObjetivo && m.status === 'ativa')
    .forEach((m) => {
      m.status = 'cancelada'
    })
}

export function definirObjetivo(tipo) {
  if (objetivoAtivo.value?.tipo === tipo) return objetivoAtivo.value
  desativarObjetivoAnterior()
  const objetivo = {
    idObjetivo: novoId(),
    idUsuario: usuarioAtual.value.idUsuario,
    tipo,
    descricao: tiposObjetivo.find((t) => t.tipo === tipo).titulo,
    dataDefinicao: dataISO(),
    ativo: true,
  }
  estado.objetivos.push(objetivo)
  const metas = gerarMetas(objetivo, historicoRecente())
  estado.metas.push(...metas.map((m) => ({ idMeta: novoId(), ...m })))
  return objetivo
}

import { reactive, watch } from 'vue'
import { regrasPontuacao, registrosDeExemplo, tiposObjetivo, usuarios } from '../data/mock.js'
import { adicionarDias, dataISO } from '../utils/datas.js'
import { avancarSequencia, calcularPontos, gerarMetas } from './regras.js'

const CHAVE = 'ritmo:dados'

function estadoInicial() {
  const hoje = new Date()
  const inicial = {
    usuarios: usuarios.map((u) => ({ ...u })),
    sessao: null,
    objetivos: [],
    metas: [],
    registros: [],
    pontuacoes: [],
    sequencias: [],
    regras: regrasPontuacao.map((r) => ({ ...r })),
    proximoId: 100,
  }
  const novoIdInicial = () => inicial.proximoId++

  for (const usuario of inicial.usuarios) {
    const pontuacao = { idUsuario: usuario.idUsuario, total: 0, ultimaAtualizacao: null }
    let sequencia = { idUsuario: usuario.idUsuario, atual: 0, recorde: 0, ultimoDiaValido: null }
    const registros = registrosDeExemplo(usuario.idUsuario, hoje).map((r) => ({ idRegistro: novoIdInicial(), ...r }))
    for (const registro of registros) {
      pontuacao.total += calcularPontos(registro, inicial.regras)
      pontuacao.ultimaAtualizacao = registro.dataHora
      sequencia = avancarSequencia(sequencia, registro.dataHora.slice(0, 10))
    }
    const tipo = tiposObjetivo[0]
    const objetivo = {
      idObjetivo: novoIdInicial(),
      idUsuario: usuario.idUsuario,
      tipo: tipo.tipo,
      descricao: tipo.titulo,
      dataDefinicao: dataISO(adicionarDias(hoje, -7)),
      ativo: true,
    }
    inicial.registros.push(...registros)
    inicial.pontuacoes.push(pontuacao)
    inicial.sequencias.push(sequencia)
    inicial.objetivos.push(objetivo)
    inicial.metas.push(...gerarMetas(objetivo, registros, hoje).map((m) => ({ idMeta: novoIdInicial(), ...m })))
  }
  return inicial
}

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE))
    return salvo?.usuarios ? salvo : estadoInicial()
  } catch {
    return estadoInicial()
  }
}

export const estado = reactive(carregar())

watch(
  estado,
  (valor) => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(valor))
    } catch {
      return
    }
  },
  { deep: true, immediate: true },
)

export function novoId() {
  return estado.proximoId++
}

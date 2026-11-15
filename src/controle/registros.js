import { niveisHumor } from '../data/mock.js'
import { estado, novoId } from '../store/estado.js'
import { dataHoraISO } from '../utils/datas.js'
import { atualizar } from './pontuacao.js'
import { usuarioAtual } from './usuario.js'

const essenciais = {
  atividade(d) {
    if (!d.modalidade) return 'Escolha a modalidade.'
    if (!(Number(d.duracaoMin) > 0 && Number(d.duracaoMin) <= 600)) return 'Informe a duração em minutos (até 600).'
    if (!d.intensidade) return 'Escolha a intensidade.'
    return ''
  },
  sono(d) {
    if (!(Number(d.duracaoHoras) > 0 && Number(d.duracaoHoras) <= 16)) return 'Informe quantas horas você dormiu (até 16).'
    if (!d.qualidade) return 'Escolha como foi a qualidade do sono.'
    return ''
  },
  alimentacao(d) {
    if (!d.tipoRefeicao) return 'Escolha a refeição.'
    if (!d.descricao?.trim()) return 'Descreva o que você comeu.'
    return ''
  },
  humor(d) {
    return d.nivel ? '' : 'Escolha como você está se sentindo.'
  },
}

const campos = {
  atividade: (d) => ({ modalidade: d.modalidade, duracaoMin: Number(d.duracaoMin), intensidade: d.intensidade }),
  sono: (d) => ({
    duracaoHoras: Number(d.duracaoHoras),
    qualidade: Number(d.qualidade),
    horaDormir: d.horaDormir || '',
    horaAcordar: d.horaAcordar || '',
  }),
  alimentacao: (d) => ({ tipoRefeicao: d.tipoRefeicao, descricao: d.descricao.trim() }),
  humor: (d) => ({ nivel: d.nivel, emoji: niveisHumor.find((h) => h.nivel === d.nivel).emoji }),
}

export function validarCamposEssenciais(categoria, dados) {
  return essenciais[categoria](dados)
}

export function registrar(categoria, dados) {
  const erro = validarCamposEssenciais(categoria, dados)
  if (erro) return { erro }
  estado.registros.push({
    idRegistro: novoId(),
    idUsuario: usuarioAtual.value.idUsuario,
    categoria,
    dataHora: dataHoraISO(),
    observacao: dados.observacao?.trim() ?? '',
    status: 'salvo',
    ...campos[categoria](dados),
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

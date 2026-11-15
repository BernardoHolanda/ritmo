import { adicionarDias, dataISO } from '../utils/datas.js'

export const usuarios = [
  {
    idUsuario: 1,
    nome: 'Facudilson da Silva',
    email: 'facudilsondasilva@exemplo.com',
    senha: '123456',
    dataNascimento: '2004-03-12',
    dataCadastro: '2026-11-01',
  },
]

export const tiposObjetivo = [
  {
    tipo: 'perda-gordura',
    titulo: 'Perder gordura',
    descricao: 'Mais atividade física e constância nos registros de alimentação.',
  },
  {
    tipo: 'ganho-massa',
    titulo: 'Ganhar massa muscular',
    descricao: 'Treinos frequentes, refeições regulares e sono para recuperação.',
  },
  {
    tipo: 'manutencao',
    titulo: 'Manter o peso',
    descricao: 'Equilíbrio entre movimento, alimentação e descanso.',
  },
]

export const modelosMeta = {
  'perda-gordura': [
    { categoria: 'atividade', descricao: 'Minutos de atividade física', valorAlvo: 180, unidade: 'min' },
    { categoria: 'sono', descricao: 'Noites com 7h ou mais de sono', valorAlvo: 5, unidade: 'noites' },
    { categoria: 'alimentacao', descricao: 'Refeições registradas', valorAlvo: 18, unidade: 'refeições' },
    { categoria: 'humor', descricao: 'Dias com humor registrado', valorAlvo: 5, unidade: 'dias' },
  ],
  'ganho-massa': [
    { categoria: 'atividade', descricao: 'Minutos de atividade física', valorAlvo: 240, unidade: 'min' },
    { categoria: 'sono', descricao: 'Noites com 7h ou mais de sono', valorAlvo: 6, unidade: 'noites' },
    { categoria: 'alimentacao', descricao: 'Refeições registradas', valorAlvo: 24, unidade: 'refeições' },
    { categoria: 'humor', descricao: 'Dias com humor registrado', valorAlvo: 5, unidade: 'dias' },
  ],
  manutencao: [
    { categoria: 'atividade', descricao: 'Minutos de atividade física', valorAlvo: 150, unidade: 'min' },
    { categoria: 'sono', descricao: 'Noites com 7h ou mais de sono', valorAlvo: 5, unidade: 'noites' },
    { categoria: 'alimentacao', descricao: 'Refeições registradas', valorAlvo: 18, unidade: 'refeições' },
    { categoria: 'humor', descricao: 'Dias com humor registrado', valorAlvo: 4, unidade: 'dias' },
  ],
}

export const regrasPontuacao = [
  { idRegra: 1, acao: 'atividade', pontos: 10, ativa: true },
  { idRegra: 2, acao: 'sono', pontos: 10, ativa: true },
  { idRegra: 3, acao: 'alimentacao', pontos: 5, ativa: true },
  { idRegra: 4, acao: 'humor', pontos: 5, ativa: true },
]

export const categorias = {
  atividade: { titulo: 'Atividade física', cor: 'var(--atividade)' },
  sono: { titulo: 'Sono', cor: 'var(--sono)' },
  alimentacao: { titulo: 'Alimentação', cor: 'var(--alimentacao)' },
  humor: { titulo: 'Humor', cor: 'var(--humor)' },
}

export const modalidades = ['Musculação', 'Corrida', 'Caminhada', 'Bicicleta', 'Natação', 'Futebol', 'Yoga', 'Dança']

export const intensidades = ['Leve', 'Moderada', 'Intensa']

export const qualidadesSono = [
  { valor: 1, emoji: '😫', rotulo: 'Ruim' },
  { valor: 2, emoji: '😐', rotulo: 'Regular' },
  { valor: 3, emoji: '😴', rotulo: 'Boa' },
]

export const niveisHumor = [
  { nivel: 1, emoji: '😞', rotulo: 'Muito mal' },
  { nivel: 2, emoji: '😕', rotulo: 'Mal' },
  { nivel: 3, emoji: '😐', rotulo: 'Neutro' },
  { nivel: 4, emoji: '🙂', rotulo: 'Bem' },
  { nivel: 5, emoji: '😄', rotulo: 'Muito bem' },
]

export const tiposRefeicao = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar']

const semanaDeExemplo = [
  { dia: -6, atividade: ['Musculação', 50, 'Intensa'], sono: [7.5, 3], refeicoes: 3, humor: 4 },
  { dia: -5, atividade: ['Corrida', 30, 'Moderada'], sono: [6, 2], refeicoes: 2, humor: 3 },
  { dia: -4, sono: [8, 3], refeicoes: 3, humor: 5 },
  { dia: -3, atividade: ['Caminhada', 40, 'Leve'], sono: [6.5, 2], refeicoes: 3 },
  { dia: -2, atividade: ['Musculação', 55, 'Intensa'], sono: [7, 3], refeicoes: 2, humor: 4 },
  { dia: -1, atividade: ['Bicicleta', 35, 'Moderada'], sono: [8.5, 3], refeicoes: 3, humor: 4 },
]

const cardapio = [
  ['Café da manhã', 'Pão com ovo e café'],
  ['Almoço', 'Arroz, feijão, frango e salada'],
  ['Jantar', 'Macarrão com carne moída'],
]

export function registrosDeExemplo(idUsuario, hoje) {
  const registros = []
  for (const d of semanaDeExemplo) {
    const data = dataISO(adicionarDias(hoje, d.dia))
    if (d.sono) {
      registros.push({ categoria: 'sono', dataHora: `${data}T07:30`, duracaoHoras: d.sono[0], qualidade: d.sono[1] })
    }
    cardapio.slice(0, d.refeicoes).forEach(([tipoRefeicao, descricao], i) => {
      registros.push({ categoria: 'alimentacao', dataHora: `${data}T${['08:00', '12:30', '19:30'][i]}`, tipoRefeicao, descricao })
    })
    if (d.atividade) {
      const [modalidade, duracaoMin, intensidade] = d.atividade
      registros.push({ categoria: 'atividade', dataHora: `${data}T18:00`, modalidade, duracaoMin, intensidade })
    }
    if (d.humor) {
      const humor = niveisHumor.find((h) => h.nivel === d.humor)
      registros.push({ categoria: 'humor', dataHora: `${data}T21:00`, nivel: humor.nivel, emoji: humor.emoji })
    }
  }
  return registros.map((r) => ({ idUsuario, observacao: '', status: 'contabilizado', ...r }))
}

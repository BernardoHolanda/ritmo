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

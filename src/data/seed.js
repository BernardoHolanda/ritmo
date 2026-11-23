import { regrasPontuacao } from './constantes.js'

// Dados com que o app começa quando ainda não existe dados/ritmo.json
// (ou quando se roda `npm run seed`): só a conta de teste, sem registros.
export const usuarioDeTeste = {
  idUsuario: 1,
  nome: 'Facudilson da Silva',
  email: 'facudilsondasilva@exemplo.com',
  senha: '123456',
  dataNascimento: '2004-03-12',
  dataCadastro: '2026-11-01',
}

export function seed() {
  return {
    usuarios: [{ ...usuarioDeTeste }],
    objetivos: [],
    metas: [],
    registros: [],
    pontuacoes: [{ idUsuario: usuarioDeTeste.idUsuario, total: 0, ultimaAtualizacao: null }],
    sequencias: [{ idUsuario: usuarioDeTeste.idUsuario, atual: 0, recorde: 0, ultimoDiaValido: null }],
    regras: regrasPontuacao.map((r) => ({ ...r })),
    proximoId: 100,
  }
}

export const categoria = 'alimentacao'

export function validarCamposEssenciais(d) {
  if (!d.tipoRefeicao) return 'Escolha a refeição.'
  if (!d.descricao?.trim()) return 'Descreva o que você comeu.'
  return ''
}

export function campos(d) {
  return { tipoRefeicao: d.tipoRefeicao, descricao: d.descricao.trim() }
}

import { salvarRegistro } from '../store/registros.js'

export function validarCamposEssenciais(d) {
  if (!d.tipoRefeicao) return 'Escolha a refeição.'
  if (!d.descricao?.trim()) return 'Descreva o que você comeu.'
  return ''
}

export function registrar(d) {
  const erro = validarCamposEssenciais(d)
  if (erro) return { erro }
  return salvarRegistro('alimentacao', { tipoRefeicao: d.tipoRefeicao, descricao: d.descricao.trim() }, d.observacao)
}

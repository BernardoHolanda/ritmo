import { niveisHumor } from '../data/constantes.js'
import { salvarRegistro } from '../store/registros.js'

export function validarCamposEssenciais(d) {
  return d.nivel ? '' : 'Escolha como você está se sentindo.'
}

export function registrar(d) {
  const erro = validarCamposEssenciais(d)
  if (erro) return { erro }
  const campos = { nivel: d.nivel, emoji: niveisHumor.find((h) => h.nivel === d.nivel).emoji }
  return salvarRegistro('humor', campos, d.observacao)
}

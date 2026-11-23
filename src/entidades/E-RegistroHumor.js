import { niveisHumor } from '../data/constantes.js'

export const categoria = 'humor'

export function validarCamposEssenciais(d) {
  return d.nivel ? '' : 'Escolha como você está se sentindo.'
}

export function campos(d) {
  return { nivel: d.nivel, emoji: niveisHumor.find((h) => h.nivel === d.nivel).emoji }
}

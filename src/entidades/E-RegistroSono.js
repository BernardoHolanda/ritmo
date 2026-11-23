export const categoria = 'sono'

export function validarCamposEssenciais(d) {
  if (!(Number(d.duracaoHoras) > 0 && Number(d.duracaoHoras) <= 16)) return 'Informe quantas horas você dormiu (até 16).'
  if (!d.qualidade) return 'Escolha como foi a qualidade do sono.'
  return ''
}

export function campos(d) {
  return {
    duracaoHoras: Number(d.duracaoHoras),
    qualidade: Number(d.qualidade),
    horaDormir: d.horaDormir || '',
    horaAcordar: d.horaAcordar || '',
  }
}

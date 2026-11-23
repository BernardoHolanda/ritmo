export const categoria = 'atividade'

export function validarCamposEssenciais(d) {
  if (!d.modalidade) return 'Escolha a modalidade.'
  if (!(Number(d.duracaoMin) > 0 && Number(d.duracaoMin) <= 600)) return 'Informe a duração em minutos (até 600).'
  if (!d.intensidade) return 'Escolha a intensidade.'
  return ''
}

export function campos(d) {
  return { modalidade: d.modalidade, duracaoMin: Number(d.duracaoMin), intensidade: d.intensidade }
}

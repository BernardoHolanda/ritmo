import { salvarRegistro } from '../store/registros.js'

export function validarCamposEssenciais(d) {
  if (!(Number(d.duracaoHoras) > 0 && Number(d.duracaoHoras) <= 16)) return 'Informe quantas horas você dormiu (até 16).'
  if (!d.qualidade) return 'Escolha como foi a qualidade do sono.'
  return ''
}

export function registrar(d) {
  const erro = validarCamposEssenciais(d)
  if (erro) return { erro }
  const campos = {
    duracaoHoras: Number(d.duracaoHoras),
    qualidade: Number(d.qualidade),
    horaDormir: d.horaDormir || '',
    horaAcordar: d.horaAcordar || '',
  }
  return salvarRegistro('sono', campos, d.observacao)
}

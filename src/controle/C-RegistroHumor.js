import * as Registro from '../entidades/E-Registro.js'
import * as RegistroHumor from '../entidades/E-RegistroHumor.js'
import { usuarioAtual } from './C-Autenticacao.js'
import { atualizar } from './C-PontuacaoSequencia.js'

export function validarCamposEssenciais(dados) {
  return RegistroHumor.validarCamposEssenciais(dados)
}

export function registrar(dados) {
  const erro = validarCamposEssenciais(dados)
  if (erro) return { erro }
  const campos = RegistroHumor.campos(dados)
  const registro = Registro.criar(RegistroHumor.categoria, usuarioAtual.value.idUsuario, campos, dados.observacao)
  return { registro, ...atualizar(registro) }
}

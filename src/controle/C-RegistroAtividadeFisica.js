import * as Registro from '../entidades/E-Registro.js'
import * as RegistroAtividadeFisica from '../entidades/E-RegistroAtividadeFisica.js'
import { usuarioAtual } from './C-Autenticacao.js'
import { atualizar } from './C-PontuacaoSequencia.js'

export function validarCamposEssenciais(dados) {
  return RegistroAtividadeFisica.validarCamposEssenciais(dados)
}

export function registrar(dados) {
  const erro = validarCamposEssenciais(dados)
  if (erro) return { erro }
  const campos = RegistroAtividadeFisica.campos(dados)
  const registro = Registro.criar(RegistroAtividadeFisica.categoria, usuarioAtual.value.idUsuario, campos, dados.observacao)
  return { registro, ...atualizar(registro) }
}

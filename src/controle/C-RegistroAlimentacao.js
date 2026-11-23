import * as Registro from '../entidades/E-Registro.js'
import * as RegistroAlimentacao from '../entidades/E-RegistroAlimentacao.js'
import { usuarioAtual } from './C-Autenticacao.js'
import { atualizar } from './C-PontuacaoSequencia.js'

export function validarCamposEssenciais(dados) {
  return RegistroAlimentacao.validarCamposEssenciais(dados)
}

export function registrar(dados) {
  const erro = validarCamposEssenciais(dados)
  if (erro) return { erro }
  const campos = RegistroAlimentacao.campos(dados)
  const registro = Registro.criar(RegistroAlimentacao.categoria, usuarioAtual.value.idUsuario, campos, dados.observacao)
  return { registro, ...atualizar(registro) }
}

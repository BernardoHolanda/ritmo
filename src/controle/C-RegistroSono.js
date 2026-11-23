import * as Registro from '../entidades/E-Registro.js'
import * as RegistroSono from '../entidades/E-RegistroSono.js'
import { usuarioAtual } from './C-Autenticacao.js'
import { atualizar } from './C-PontuacaoSequencia.js'

export function validarCamposEssenciais(dados) {
  return RegistroSono.validarCamposEssenciais(dados)
}

export function registrar(dados) {
  const erro = validarCamposEssenciais(dados)
  if (erro) return { erro }
  const campos = RegistroSono.campos(dados)
  const registro = Registro.criar(RegistroSono.categoria, usuarioAtual.value.idUsuario, campos, dados.observacao)
  return { registro, ...atualizar(registro) }
}

import * as Pontuacao from '../entidades/E-Pontuacao.js'
import * as Sequencia from '../entidades/E-Sequencia.js'
import * as Usuario from '../entidades/E-Usuario.js'
import { dataISO } from '../utils/datas.js'
import { iniciarSessao } from './C-Autenticacao.js'

export function validarDados({ nome, email, senha, dataNascimento }) {
  if (!nome?.trim() || nome.trim().length < 2) return 'Informe seu nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? '')) return 'Informe um e-mail válido.'
  if (Usuario.buscarPorEmail(email)) return 'Este e-mail já está cadastrado.'
  if (!senha || senha.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (!dataNascimento || dataNascimento >= dataISO()) return 'Informe uma data de nascimento válida.'
  return ''
}

export function cadastrar(dados) {
  const erro = validarDados(dados)
  if (erro) return { erro }
  const usuario = Usuario.criar(dados)
  Pontuacao.criar(usuario.idUsuario)
  Sequencia.criar(usuario.idUsuario)
  iniciarSessao(usuario)
  return { usuario }
}

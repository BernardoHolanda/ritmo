import { estado, novoId } from '../store/estado.js'
import { dataISO } from '../utils/datas.js'
import { iniciarSessao } from './C-Autenticacao.js'

export function validarDados({ nome, email, senha, dataNascimento }) {
  if (!nome?.trim() || nome.trim().length < 2) return 'Informe seu nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? '')) return 'Informe um e-mail válido.'
  if (estado.usuarios.some((u) => u.email === email.trim().toLowerCase())) return 'Este e-mail já está cadastrado.'
  if (!senha || senha.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (!dataNascimento || dataNascimento >= dataISO()) return 'Informe uma data de nascimento válida.'
  return ''
}

export function cadastrar(dados) {
  const erro = validarDados(dados)
  if (erro) return { erro }
  const usuario = {
    idUsuario: novoId(),
    nome: dados.nome.trim(),
    email: dados.email.trim().toLowerCase(),
    senha: dados.senha,
    dataNascimento: dados.dataNascimento,
    dataCadastro: dataISO(),
  }
  estado.usuarios.push(usuario)
  estado.pontuacoes.push({ idUsuario: usuario.idUsuario, total: 0, ultimaAtualizacao: null })
  estado.sequencias.push({ idUsuario: usuario.idUsuario, atual: 0, recorde: 0, ultimoDiaValido: null })
  iniciarSessao(usuario)
  return { usuario }
}

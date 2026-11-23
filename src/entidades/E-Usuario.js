import { estado, novoId } from '../store/estado.js'
import { dataISO } from '../utils/datas.js'

export function buscarPorEmail(email) {
  return estado.usuarios.find((u) => u.email === email?.trim().toLowerCase()) ?? null
}

export function validarCredenciais(usuario, senha) {
  return Boolean(usuario) && usuario.senha === senha
}

export function criar({ nome, email, senha, dataNascimento }) {
  estado.usuarios.push({
    idUsuario: novoId(),
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    senha,
    dataNascimento,
    dataCadastro: dataISO(),
  })
  return estado.usuarios.at(-1)
}

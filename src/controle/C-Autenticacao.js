import { computed } from 'vue'
import * as Usuario from '../entidades/E-Usuario.js'
import { estado } from '../store/estado.js'
import { dataHoraISO } from '../utils/datas.js'

export const usuarioAtual = computed(
  () => estado.usuarios.find((u) => u.idUsuario === estado.sessao?.idUsuario) ?? null,
)

export function iniciarSessao(usuario) {
  estado.sessao = { idUsuario: usuario.idUsuario, inicio: dataHoraISO() }
}

export function encerrarSessao() {
  estado.sessao = null
}

export function autenticar(email, senha) {
  const usuario = Usuario.buscarPorEmail(email)
  if (!Usuario.validarCredenciais(usuario, senha)) return { erro: 'E-mail ou senha incorretos.' }
  iniciarSessao(usuario)
  return { usuario }
}

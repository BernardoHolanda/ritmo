import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { seed } from '../src/data/seed.js'

// Registro de dados do app: um arquivo de texto (JSON) na pasta dados/.
// O próprio servidor do Vite (npm run dev / npm run preview) lê e grava esse
// arquivo pelo endereço /api/dados. Não tem banco de dados.
export const ARQUIVO = fileURLToPath(new URL('../dados/ritmo.json', import.meta.url))

export function gravar(dados) {
  fs.mkdirSync(path.dirname(ARQUIVO), { recursive: true })
  const temporario = `${ARQUIVO}.tmp`
  fs.writeFileSync(temporario, JSON.stringify(dados, null, 2) + '\n')
  fs.renameSync(temporario, ARQUIVO)
}

function ler() {
  if (!fs.existsSync(ARQUIVO)) gravar(seed())
  return fs.readFileSync(ARQUIVO, 'utf8')
}

function rotaDados(req, res, next) {
  if (req.url.split('?')[0] !== '/api/dados') return next()
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'GET') return res.end(ler())

  if (req.method === 'PUT') {
    let corpo = ''
    req.on('data', (parte) => (corpo += parte))
    req.on('end', () => {
      try {
        const dados = JSON.parse(corpo)
        if (!Array.isArray(dados?.usuarios)) throw new Error('formato inválido')
        gravar(dados)
        res.end('{"ok":true}')
      } catch (e) {
        res.statusCode = 400
        res.end(JSON.stringify({ erro: e.message }))
      }
    })
    return
  }

  res.statusCode = 405
  res.end('{"erro":"método não permitido"}')
}

export function arquivoDeDados() {
  return {
    name: 'ritmo-arquivo-dados',
    configureServer(servidor) {
      servidor.middlewares.use(rotaDados)
    },
    configurePreviewServer(servidor) {
      servidor.middlewares.use(rotaDados)
    },
  }
}

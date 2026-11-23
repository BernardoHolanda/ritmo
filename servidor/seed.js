// npm run seed: apaga os dados salvos e recomeça só com o usuário de teste.
import { seed } from '../src/data/seed.js'
import { ARQUIVO, gravar } from './arquivo-dados.js'

gravar(seed())
console.log(`Dados recriados em ${ARQUIVO}`)

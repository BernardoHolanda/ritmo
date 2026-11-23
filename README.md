# Ritmo

Aplicativo web (PWA) que reúne exercício, alimentação e descanso num só lugar.
Prova de conceito da disciplina MPS: sem banco de dados, os dados ficam num arquivo de texto (`dados/ritmo.json`).

Feito com [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/) + [vite-plugin-pwa](https://vite-pwa-org.netlify.app/).

## Configurção incial (necessário apenas na primeira vez)

Precisa do [Node.js](https://nodejs.org/) 20 ou mais novo.

```bash
git clone https://github.com/BernardoHolanda/ritmo.git
cd ritmo
npm install
```

### Abrir na sua maquina

```bash
cd ritmo
npm run dev
```

Abra o endereço que aparecer no terminal.
O navegador recarrega sozinho a cada arquivo salvo.

### Abrir no celular

Com o celular na mesma rede Wi-Fi do computador:

```bash
npm run dev -- --host
```

e abra no celular o endereço "Network" que aparecer.
O botão "Adicionar à tela inicial" como app só aparece quando o site está publicado
com HTTPS; pela rede local dá para ver e testar as telas normalmente.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera a versão final em `dist/` |
| `npm run preview` | serve a versão de `dist/` para conferir antes de publicar |
| `npm run seed` | apaga os dados e recria `dados/ritmo.json` só com o usuário de teste |

## Estrutura

```
public/          ícones e arquivos servidos como estão
servidor/        lê e grava dados/ritmo.json (/api/dados) e o script do seed
dados/ritmo.json registro de dados do app (criado sozinho, fica fora do git)
src/
  main.js        ponto de entrada
  App.vue        componente raiz
  router.js      rotas das telas
  style.css      estilos globais
  views/         uma tela por arquivo, com o nome da classe F- do Astah (F-TelaLogin.vue...)
  components/    peças reaproveitadas entre telas
  controle/      coordena cada caso de uso, com o nome da classe C- do Astah (C-Metas.js...)
  entidades/     dados e regras de negócio, com o nome da classe E- do Astah (E-Meta.js...)
  store/         estado do app e a ligação com o arquivo de dados
  utils/         funções de data
  data/
    constantes.js  listas fixas (tipos de objetivo, regras de pontuação, opções dos formulários)
    seed.js        dados iniciais: só o usuário de teste
```

O código segue a divisão fronteira, controle e entidade do modelo: a tela (F-) só recebe
os dados e mostra o resultado, o controle (C-) coordena o caso de uso, e as regras ficam
nas entidades (E-), como o cálculo de pontos em E-RegraPontuacao e a geração das metas
em E-Meta. Os nomes das funções seguem as operações do Astah.

## Dados

Tudo o que o app guarda (usuários, objetivos, metas, registros, pontuação) fica em
`dados/ritmo.json`, um arquivo de texto que dá para abrir e ler. Quem lê e grava é o
próprio servidor do Vite, então os dados só são salvos com `npm run dev` ou
`npm run preview` rodando. Só o login fica no navegador.

Se o arquivo não existir, ele é criado com o seed. Para apagar tudo e voltar ao começo:

```bash
npm run seed
```

Conta de teste: `facudilsondasilva@exemplo.com`, senha `123456`.

## Registrando o progresso

O [`PROGRESSO.md`](PROGRESSO.md) diz o que já está feito e o que foi começado mas ainda
falta terminar (com o que falta). Quem mexer em algo atualiza o arquivo.

## Mensagens de commit

Usamos um prefixo no início de cada commit para facilitar a leitura do histórico:

| Prefixo | Quando usar |
|---|---|
| `feat` | adiciona uma nova funcionalidade |
| `fix` | corrige um erro ou bug |
| `docs` | mexe só na documentação (README, PROGRESSO.md...) |
| `style` | formatação (espaços, recuos, ponto e vírgula) que não muda a lógica |
| `refactor` | reescreve ou melhora o código sem adicionar função nem corrigir bug |
| `test` | cria ou ajusta testes |
| `chore` | tarefas, dependências ou ferramentas que não mudam o código do app |
| `perf` | melhora o desempenho |
| `build` | arquivos de build, empacotamento ou dependências externas |

Exemplos:

```
feat: cria tela de registro de sono
fix: corrige soma da pontuação do dia
docs: atualiza PROGRESSO.md
chore: cria projeto Ritmo com Vue + Vite como PWA
```

# Ritmo

Aplicativo web (PWA) que reúne exercício, alimentação e descanso num só lugar.
Prova de conceito da disciplina MPS: só front-end, com dados de mentira (sem banco de dados).

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

## Estrutura

```
public/          ícones e arquivos servidos como estão
src/
  main.js        ponto de entrada
  App.vue        componente raiz
  style.css      estilos globais
  views/         uma tela por arquivo (Hoje, Metas, Retrospectiva...)
  components/    peças reaproveitadas entre telas
  data/mock.js   dados de mentira usados no lugar do banco
```

Os nomes dos dados em `src/data/mock.js` seguem as entidades do DC-ENTIDADE
(E-Usuario, E-Registro, E-Meta...), para o código bater com a modelagem.

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

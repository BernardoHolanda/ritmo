# Progresso

## Feito

- Base do projeto: Vue + Vite como PWA, ícones e estrutura de pastas.
- Rotas, barra de navegação, estilos e dados de exemplo.
- UC01 Cadastrar Usuário e UC02 Realizar Login.
- UC03 Definir Objetivo (gera as metas da semana) e UC04 Consultar Metas.
- UC05 Painel de Progresso Diário (tela Hoje).
- UC06 a UC09 Registrar Atividade Física, Sono, Alimentação e Humor, já somando pontos e sequência.

## Começado, mas falta terminar

- UC10, UC11 e UC12 (Histórico, Retrospectiva, Pontuação e Sequência): a parte de dados já existe,
  falta fazer as telas. Use `listarPorPeriodo(inicio, fim)` de `src/controle/registros.js` para buscar
  os registros e `consultar()` de `src/controle/pontuacao.js` para pontos, sequência e recorde.
  Depois é só criar a rota em `src/router.js` e, se quiser, um item em `BarraNavegacao.vue`.

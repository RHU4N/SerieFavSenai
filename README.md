# SerieFav (React + Vite)

Projeto de exemplo em React usando Vite que consome a API pública do TVMaze para listar séries, mostrar detalhes resumidos e marcar itens como "assistido".

Este README descreve a aplicação, estrutura de arquivos, como rodar localmente, e detalhes sobre a API usada.

## Visão geral

- Interface simples que apresenta um resumo (total, assistidos, não assistidos) e uma lista de cards com séries.
- Cada card mostra: imagem da série, título, gêneros, emissora e um botão para alternar o estado de "assistido".
- Os dados de séries são carregados via HTTP pela API pública do TVMaze.

## Tecnologias

- React (JSX)
- Vite (dev server / bundling)
- Axios (para requisições HTTP) — arquivo: `src/service/api.js`
- CSS simples (arquivos em `src/` e `src/components/`)

## Estrutura do projeto (resumida)

- `index.html` — entrada da página
- `src/main.jsx` — bootstrap do React
- `src/index.css` — estilos globais
- `src/App.jsx` — componente principal que faz fetch da API e organiza a página
- `src/App.css` — estilos da aplicação principal
- `src/components/SerieCard.jsx` — componente de card de série
- `src/components/SerieCard.css` — estilos do card
- `src/service/api.js` — instância Axios configurada (baseURL: `https://api.tvmaze.com`)

## API usada: TVMaze

A aplicação consome a API pública do TVMaze (https://www.tvmaze.com/api). Neste projeto usamos o endpoint `/shows` para buscar uma lista de séries.

- Endpoint utilizado: `GET https://api.tvmaze.com/shows`
- O retorno é um array de objetos com informações da série. Campos utilizados no app:
  - `id` — identificador da série
  - `name` — nome/título da série
  - `genres` — array de gêneros (ex.: `["Drama", "Sci-Fi"]`)
  - `network` — objeto com informações de emissora (`network.name` usado)
  - `image` — objeto com URLs (`image.medium`) usado para mostrar imagem

Observações:

- O endpoint `/shows` retorna uma grande lista de séries públicas. A aplicação assume que os campos acima podem estar ausentes (ex.: `network` ou `image`) e trata esses casos exibindo `N/A` ou uma imagem vazia.

## Como rodar localmente

Pré-requisitos: Node.js e npm/yarn instalados.

1. Instalar dependências:

```bash
npm install
```

2. Rodar o servidor de desenvolvimento (Vite):

```bash
npm run dev
```

3. Abrir o navegador em `http://localhost:5173` (porta padrão do Vite).

Scripts no `package.json` (padrão criado pelo template Vite):

- `dev` — inicia o servidor de desenvolvimento
- `build` — gera build de produção
- `preview` — preview do build

## Comportamento do front-end

- O `App.jsx` faz fetch em `useEffect` para `GET /shows` e salva os dados no state `series`.
- Cada item mapeado para `SerieCard` recebe propriedades: `name`, `genres`, `emissora`, `img`, `assistido` e `onToggleAssistido`.
- `onToggleAssistido` atualiza localmente o estado (não há persistência — é apenas em memória enquanto a página está aberta).

## Estilização e layout

- O layout principal usa um grid responsivo (`.lista-filmes`) que é configurado para 2 colunas em larguras maiores; o container principal foi centralizado com `max-width` para evitar que a página estique demais.
- Os cards possuem uma faixa de cor (verde/vermelho) indicando estado `assistido` / `não assistido` e um botão com ação.
- Se precisar ajustar espaçamentos, larguras de imagem ou comportamento de quebras de texto, edite `src/components/SerieCard.css` e `src/App.css`.

## Como adaptar para outras APIs ou endpoints

- Para usar outro endpoint, basta alterar a chamada em `src/service/api.js` (ou criar outro arquivo de serviço) e adaptar a transformação de dados no `useEffect` de `App.jsx`.
- Ex.: para carregar por página, você pode usar `GET /shows?page=1` e combinar os resultados.

## Possíveis melhorias

- Persistir o estado `assistido` (localStorage ou backend) para manter marcações entre visitas.
- Paginação/virtualização para melhorar performance com muitas séries.
- Adicionar busca/filtragem por nome ou gênero.
- Adicionar tratamento de carregamento e mensagens de erro visuais.

## Observações finais

Este projeto é uma base didática. A API TVMaze é pública e sem autenticação para os endpoints usados aqui, mas verifique limites de uso se você integrar em um app em produção.

Se quiser, eu posso:

- Adicionar persistência (localStorage) para salvar o estado `assistido`.
- Melhorar o layout do card (ex.: imagem fixa, botão reposicionado).
- Implementar busca por nome usando o endpoint `GET /search/shows?q=:query`.

---

Se desejar que eu gere um README em inglês, ou que inclua diagramas/prints, me diga qual formato prefere.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

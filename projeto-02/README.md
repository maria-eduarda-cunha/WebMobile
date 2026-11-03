# WebMobile

Projeto educacional Duo Libras, desenvolvido com Next.js.

## Integrantes

- Daniel Yoshio Omiya | 10356170
- Gabriel Jun Ito | 10427610
- Maria Eduarda Pinheiro Leal da Cunha | 10416676
- Rodrigo Nascimento Tomaz | 10418449

## Primeiros passos

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Para começar a desenvolver, edite `app/page.js`. A página será atualizada
automaticamente conforme os arquivos forem alterados.

Este projeto usa `next/font` para otimizar automaticamente a fonte Geist,
disponibilizada pela Vercel.

## Arquitetura definida

![Arquitetura do projeto](image.png)

Os dados de módulos e quizzes permanecem em arquivos JSON locais. Route Handlers
do Next.js disponibilizam esses arquivos como endpoints JSON, e as páginas
consomem os endpoints com `fetch` no navegador. Não há um backend separado nem
uma API externa configurada neste projeto.

### Fluxo de componentes e navegação

O diagrama abaixo mostra quais páginas carregam os dados, quais componentes
elas renderizam e como o usuário navega entre os módulos, aulas e quizzes.

```mermaid
flowchart TD
    Layout["app/layout.js<br/>estrutura global"] --> PaginaInicial["app/page.js<br/>página inicial"]
    Layout --> PaginaModulo["app/modulos/[id]/page.js<br/>página do módulo"]
    Layout --> PaginaAula["app/modulos/[id]/aulas/[aulaId]/page.js<br/>página da aula"]
    Layout --> PaginasQuiz["páginas de quiz<br/>/quizzes/*"]

    PaginaInicial --> Cabecalho["Cabecalho<br/>navegação e identidade visual"]
    PaginaModulo --> Cabecalho
    PaginaAula --> Cabecalho
    PaginasQuiz --> Cabecalho

    PaginaInicial --> CartaoModulo["CartaoModulo<br/>cartão de cada módulo"]
    CartaoModulo --> PaginaModulo

    PaginaModulo --> Aula["opção Aula"]
    PaginaModulo --> QuizInicial["opção Quiz"]
    Aula --> PaginaAula
    QuizInicial --> PaginasQuiz

    PaginaInicial --> ApiModulos["GET /api/modulos"]
    PaginaModulo --> ApiModulo["GET /api/modulos/{id}"]
    PaginaAula --> ApiConteudo["GET /api/conteudos/{id}"]
    PaginasQuiz --> ApiConteudo

    ApiModulos --> Modulos["data/modulos.json<br/>lista de módulos"]
    ApiModulo --> Modulos
    ApiConteudo --> ConteudoAula["data/conteudos/alfabeto.json<br/>aulas e quizzes"]

    PaginasQuiz --> BarraProgresso["BarraProgresso<br/>progresso da atividade"]
    PaginasQuiz --> QuizSelecao["QuizSelecao<br/>seleção de alternativa ou mídia"]
    PaginasQuiz --> QuizOrdem["QuizOrdem<br/>ordenação por arrastar"]
    PaginasQuiz --> QuizAssociacao["QuizAssociacao<br/>associação de texto e mídia"]

    QuizSelecao --> QuizSeguinte["próximo quiz"]
    QuizOrdem --> QuizSeguinte
    QuizAssociacao --> Resultado["resultado da atividade"]
    PaginasQuiz --> Resultado

    classDef pagina fill:#e8f1ff,stroke:#2563eb,color:#111827
    classDef componente fill:#e9f9ee,stroke:#16a34a,color:#111827
    classDef dado fill:#fff7e6,stroke:#d97706,color:#111827
    classDef fluxo fill:#f5eaff,stroke:#9333ea,color:#111827

    class Layout,PaginaInicial,PaginaModulo,PaginaAula,PaginasQuiz pagina
    class Cabecalho,CartaoModulo,BarraProgresso,QuizSelecao,QuizOrdem,QuizAssociacao componente
    class Modulos,ConteudoAula dado
    class Aula,QuizInicial,QuizSeguinte,Resultado fluxo
```

As páginas solicitam dados aos Route Handlers via `fetch`. Os handlers leem os
JSON locais e devolvem respostas HTTP; identificadores sem módulo ou conteúdo
correspondente retornam `404`. As rotas de navegação levam à aula e aos quizzes
em sequência.

## Organização sugerida do projeto

```text
duo-libras/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   └── modulos/
│       └── [id]/
│           ├── page.js
│           ├── aulas/
│           │   └── [aulaId]/
│           │       └── page.js
│           └── quizzes/
│               └── [quizId]/
│                   └── page.js
├── components/
│   ├── Header.js
│   ├── ModuleCard.js
│   ├── LessonViewer.js
│   ├── QuizRenderer.js
│   ├── ProgressBar.js
│   └── Lives.js
├── services/
│   └── api.js
├── data/
│   ├── modulos.json
│   └── conteudos/
│       └── alfabeto.json
└── public/
    ├── img/
    │   └── logo.png
    └── media/
        ├── imagens/
        ├── gifs/
        └── videos/
```

## Relação entre o projeto original e a nova arquitetura

| Projeto original | Responsabilidade atual | Adaptação proposta no Next.js |
|---|---|---|
| `index.html` | Documento HTML inicial | `app/layout.js` para a estrutura global e `app/page.js` como página inicial |
| `home.html` | Exibição dos seis módulos temáticos | `app/page.js` e `components/ModuleCard.js`, com os módulos carregados dos dados JSON |
| `modulo.html` | Apresentação das opções de aula e quiz | `app/modulos/[id]/page.js`, exibindo o conteúdo do módulo selecionado |
| `aula.html` | Exibição do conteúdo demonstrativo em mídia | `app/modulos/[id]/aulas/[aulaId]/page.js` e `components/LessonViewer.js` |
| `quiz-selecione-correto1.html` | Quiz de seleção de alternativa | Rota dinâmica de quiz e componente específico de múltipla escolha |
| `quiz-arraste-na-ordem.html` | Ordenação de palavras por arrastar e soltar | Rota dinâmica de quiz e componente de ordenação com estado React |
| `quiz-selecione-correto2.html` | Identificação de um sinal entre opções de mídia | Rota dinâmica de quiz e componente de seleção de vídeo ou imagem |
| `quiz-arraste-aqui.html` | Associação de textos com vídeos | Rota dinâmica de quiz e componente de associação entre texto e mídia |
| `js/modulo.js` | Script associado à tela de módulo | Lógica React da página de módulo, após análise das funções existentes |
| `js/quiz-elementos.js` | Elementos e funções compartilhados pelos quizzes | `components/Lives.js`, `components/ProgressBar.js` e lógica compartilhada |
| `js/quiz-selecione-correto1.js` | Interação da primeira seleção | Lógica específica do quiz de múltipla escolha |
| `js/quiz-selecione-correto2.js` | Interação da seleção de vídeos | Lógica específica de seleção de mídia |
| `js/quiz-arraste-na-ordem.js` | Eventos de arrastar e soltar palavras | Estado React e lógica de ordenação das opções |
| `js/quiz-arraste-aqui.js` | Eventos de associação por arrastar e soltar | Estado React e lógica de associação entre textos e vídeos |
| `conteudo.json` | Dados do módulo Alfabeto e respostas dos quizzes | `data/conteudos/alfabeto.json`, servido pela API JSON do Next.js |
| `style.css` | Estilos principais das páginas | `app/globals.css` e, se necessário, CSS Modules por componente |
| `img/logo.png` | Logotipo do Duo Libras | `public/img/logo.png` |
| Referências de mídia em HTML e JSON | GIFs e vídeos demonstrativos | Centralizar os caminhos em dados JSON e organizar os arquivos em `public/media/` ou em hospedagem externa |

## API JSON

Os endpoints são implementados com Route Handlers em `app/api/` e consumidos
por `hooks/useApiData.js`, que trata carregamento, erros HTTP e cancelamento de
requisições durante a navegação.

| Método e endpoint | Fonte JSON | Resultado |
|---|---|---|
| `GET /api/modulos` | `data/modulos.json` | Lista de módulos |
| `GET /api/modulos/:id` | `data/modulos.json` | Dados do módulo ou `404` |
| `GET /api/conteudos/:id` | `data/conteudos/:id.json` | Aula e quizzes do módulo ou `404` |

No momento, existe conteúdo apenas para `alfabeto`. Adicione outros arquivos de
conteúdo e registre-os no Route Handler para habilitar aulas e quizzes desses
módulos.

## Saiba mais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Aprenda Next.js](https://nextjs.org/learn)
- [Repositório do Next.js no GitHub](https://github.com/vercel/next.js)

## Implantação

A maneira mais simples de implantar o projeto é usar a [Vercel](https://vercel.com/new).
Consulte também a [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

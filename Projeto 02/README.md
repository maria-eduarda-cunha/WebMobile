# WebMobile
Integrantes:

- Daniel Yoshio Omiya | 10356170
- Gabriel Jun Ito | 10427610
- Maria Eduarda Pinheiro Leal da Cunha | 10416676
- Rodrigo Nascimento Tomaz | 10418449

## 1. Arquitetura definida
![alt text](image.png)
A API estática fornece os dados, mas não executa regras de negócio nem altera o conteúdo. O backend é responsável por consultar esses dados e disponibilizá-los ao Next.js.

## 2. Organização sugerida do projeto
```
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

## 3. Relacionamento entre o projeto original e a nova arquitetura

| Projeto original | Responsabilidade atual | Adaptação proposta no Next.js |
|---|---|---|
| `index.html` | Documento HTML inicial | `app/layout.js` para a estrutura global e `app/page.js` como página inicial |
| `home.html` | Exibição dos seis módulos temáticos | `app/page.js` + `components/ModuleCard.js`, com os módulos carregados dos dados JSON |
| `modulo.html` | Apresentação das opções de aula e quiz | `app/modulos/[id]/page.js`, exibindo o conteúdo do módulo selecionado |
| `aula.html` | Exibição do conteúdo demonstrativo em mídia | `app/modulos/[id]/aulas/[aulaId]/page.js` + `components/LessonViewer.js` |
| `quiz-selecione-correto1.html` | Quiz de seleção de alternativa | Rota dinâmica de quiz + componente específico de múltipla escolha |
| `quiz-arraste-na-ordem.html` | Ordenação de palavras por arrastar e soltar | Rota dinâmica de quiz + componente de ordenação com estado React |
| `quiz-selecione-correto2.html` | Identificação de um sinal entre opções de mídia | Rota dinâmica de quiz + componente de seleção de vídeo ou imagem |
| `quiz-arraste-aqui.html` | Associação de textos com vídeos | Rota dinâmica de quiz + componente de associação entre texto e mídia |
| `js/modulo.js` | Script associado à tela de módulo | Lógica React da página de módulo, após análise das funções existentes |
| `js/quiz-elementos.js` | Elementos e funções compartilhados pelos quizzes | `components/Lives.js`, `components/ProgressBar.js` e lógica compartilhada |
| `js/quiz-selecione-correto1.js` | Interação da primeira seleção | Lógica específica do quiz de múltipla escolha |
| `js/quiz-selecione-correto2.js` | Interação da seleção de vídeos | Lógica específica de seleção de mídia |
| `js/quiz-arraste-na-ordem.js` | Eventos de arrastar e soltar palavras | Estado React e lógica de ordenação das opções |
| `js/quiz-arraste-aqui.js` | Eventos de associação por arrastar e soltar | Estado React e lógica de associação entre textos e vídeos |
| `conteudo.json` | Dados do módulo Alfabeto e respostas dos quizzes | `data/conteudos/alfabeto.json` ou arquivo JSON disponibilizado pela API estática |
| `style.css` | Estilos principais das páginas | `app/globals.css` e, se necessário, CSS Modules por componente |
| `img/logo.png` | Logotipo do Duo Libras | `public/img/logo.png` |
| Referências de mídia em HTML e JSON | GIFs e vídeos demonstrativos | Centralizar os caminhos em dados JSON e organizar os arquivos em `public/media/` ou em hospedagem externa |

Projeto original	Responsabilidade atual	Adaptação proposta no Next.js
index.html	Documento HTML inicial	app/layout.js para a estrutura global e app/page.js como página inicial
home.html	Exibição dos seis módulos temáticos	app/page.js + components/ModuleCard.js, com os módulos carregados dos dados JSON
modulo.html	Apresentação das opções de aula e quiz	app/modulos/[id]/page.js, exibindo o conteúdo do módulo selecionado
aula.html	Exibição do conteúdo demonstrativo em mídia	app/modulos/[id]/aulas/[aulaId]/page.js + components/LessonViewer.js
quiz-selecione-correto1.html	Quiz de seleção de alternativa	Rota dinâmica de quiz + componente específico de múltipla escolha
quiz-arraste-na-ordem.html	Ordenação de palavras por arrastar e soltar	Rota dinâmica de quiz + componente de ordenação com estado React
quiz-selecione-correto2.html	Identificação de um sinal entre opções de mídia	Rota dinâmica de quiz + componente de seleção de vídeo ou imagem
quiz-arraste-aqui.html	Associação de textos com vídeos	Rota dinâmica de quiz + componente de associação entre texto e mídia
js/modulo.js	Script associado à tela de módulo	Lógica React da página de módulo, após análise das funções existentes
js/quiz-elementos.js	Elementos e funções compartilhados pelos quizzes	components/Lives.js, components/ProgressBar.js e lógica compartilhada
js/quiz-selecione-correto1.js	Interação da primeira seleção	Lógica específica do quiz de múltipla escolha
js/quiz-selecione-correto2.js	Interação da seleção de vídeos	Lógica específica de seleção de mídia
js/quiz-arraste-na-ordem.js	Eventos de arrastar e soltar palavras	Estado React e lógica de ordenação das opções
js/quiz-arraste-aqui.js	Eventos de associação por arrastar e soltar	Estado React e lógica de associação entre textos e vídeos
conteudo.json	Dados do módulo Alfabeto e respostas dos quizzes	data/conteudos/alfabeto.json ou arquivo JSON disponibilizado pela API estática
style.css	Estilos principais das páginas	app/globals.css e, se necessário, CSS Modules por componente
assets/styles.css	Estilos auxiliares	Revisar as regras e incorporá-las aos estilos globais ou aos CSS Modules, conforme sua utilização
img/logo.png	Logotipo do Duo Libras	public/img/logo.png
img_wireframe/1.png a 7.png	Referências visuais das telas	Manter na documentação do projeto, fora da interface de produção
Referências de mídia em HTML e JSON	GIFs e vídeos demonstrativos	Centralizar os caminhos em dados JSON e organizar os arquivos em public/media/ ou em hospedagem externa

## 4. Contrato da API
O backend deve oferecer endpoints consistentes, mesmo que os dados de origem estejam em arquivos estáticos.

|Método e endpoint proposto |	Fonte JSON	| Resultado esperado
|------|-------|----------|
|GET /api/modulos	|modulos.json	|Lista de módulos|
|GET /api/modulos/:id	| Dados do módulo	| Detalhes de um módulo
|GET /api/modulos/:id/aulas |	Conteúdo do módulo|	Lista de aulas
|GET /api/quizzes/:id	|Dados do quiz	|Questões e configurações da atividade|

O backend deverá converter os identificadores recebidos nas requisições para os arquivos ou recursos correspondentes, validar os dados e devolver respostas JSON. Um identificador inexistente deverá resultar em uma resposta de não encontrado, em vez de um erro inesperado.
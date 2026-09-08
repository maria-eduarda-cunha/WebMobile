const STATE_KEY = 'duolibras-state';
const TOTAL_ATTEMPTS = 3;
const DEFAULT_STATE = {
  currentStreak: 0,
  remainingAttempts: 3,
};

let state = {};
const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  };

  renderRemainingAttempts();
};

const renderRemainingAttempts = () => {
  const $remainingAttempts = document.getElementById('remaining-attempts');
  $remainingAttempts.textContent = '';

  for (let i = 0; i < TOTAL_ATTEMPTS; i++) {
    const heart = document.createElement('span');
    heart.classList.add('material-symbols-outlined', 'coracao');
    heart.setAttribute('aria-hidden', 'true');
    heart.textContent = i < state.remainingAttempts ? 'favorite' : 'heart_broken';
    $remainingAttempts.appendChild(heart);
  }
}

const initState = () => {
  const stateStr = localStorage.getItem(STATE_KEY);
  const currentState = stateStr ? JSON.parse(stateStr) : DEFAULT_STATE;
  setState(currentState);
};

const saveState = () => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

window.addEventListener('load', () => {
  initState();

  if (window.location.pathname === '/quiz1-selecione-o-correto.html') {
    setState({ remainingAttempts: 3 });
  }
});

window.addEventListener('beforeunload', () => {
  saveState();
});

const questions = [
  {
    type: 'single_choice',
    prompt: 'Selecione o correto',
    options: [
      {
        id: 'o1',
        content: 'Seleção 1',
      },
      {
        id: 'o2',
        content: 'Seleção 2',
      },
      {
        id: 'o3',
        content: 'Seleção 3',
      },
      {
        id: 'o4',
        content: 'Seleção 4',
      },
    ],
    answer: { optionId: 'o3' },
  },
  {
    type: 'order',
    prompt: 'Arraste na ordem',
    items: [
      {
        id: 'i1',
        content: 'Seleção 1',
      },
      {
        id: 'i2',
        content: 'Seleção 2',
      },
      {
        id: 'i3',
        content: 'Seleção 3',
      },
      {
        id: 'i4',
        content: 'Seleção 4',
      },
    ],
    answer: {
      order: ['i3', 'i1', 'i4', 'i2'],
    },
  },
  {
    type: 'image_choice',
    prompt: 'Selecione o correto',
    options: [
      {
        id: 'o1',
        image: {
          url: 'assets/imgs/1-libras04.gif',
          alt: 'Imagem 1',
        },
      },
      {
        id: 'o2',
        image: {
          url: 'assets/imgs/1-libras04.gif',
          alt: 'Imagem 2',
        },
      },
      {
        id: 'o3',
        image: {
          url: 'assets/imgs/1-libras04.gif',
          alt: 'Imagem 3',
        },
      },
      {
        id: 'o4',
        image: {
          url: 'assets/imgs/1-libras04.gif',
          alt: 'Imagem 4',
        },
      },
    ],
    answer: { optionId: 'o2' },
  },
  {
    type: 'match',
    prompt: 'Relacione os textos e os vídeos corretamente',
    items: [
      {
        id: 'i1',
        type: 'text',
        content: 'Seleção 1',
      },
      {
        id: 'i2',
        type: 'text',
        content: 'Seleção 2',
      },
      {
        id: 'i3',
        type: 'text',
        content: 'Seleção 3',
      },
    ],
    targets: [
      {
        id: 't1',
        type: 'image',
        url: 'assets/imgs/1-libras04.gif',
        alt: 'Imagem 1',
      },
      {
        id: 't2',
        type: 'image',
        url: 'assets/imgs/1-libras04.gif',
        alt: 'Imagem 2',
      },
      {
        id: 't3',
        type: 'image',
        url: 'assets/imgs/1-libras04.gif',
        alt: 'Imagem 3',
      },
    ],
    answer: {
      matches: [
        { itemId: 'i1', targetId: 't2' },
        { itemId: 'i2', targetId: 't3' },
        { itemId: 'i3', targetId: 't1' },
      ],
    },
  },
];

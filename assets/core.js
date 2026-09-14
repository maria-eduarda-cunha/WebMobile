const STATE_KEY = 'duolibras-state';
const TOTAL_ATTEMPTS = 3;
const DEFAULT_STATE = {
  currentStreak: 0,
  remainingAttempts: 3,
};

const $btnNext = document.getElementById('btn-next');
const $remainingAttempts = document.getElementById('remaining-attempts');
const $options = document.querySelectorAll('.option');

let state = {};
const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  };

  saveState();
  render();
};

const initState = () => {
  const stateStr = localStorage.getItem(STATE_KEY);
  const currentState = stateStr ? JSON.parse(stateStr) : DEFAULT_STATE;
  setState(currentState);
};

const saveState = () => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const render = () => {
  renderRemainingAttempts();
};

const renderRemainingAttempts = () => {
  $remainingAttempts.textContent = '';

  for (let i = 0; i < TOTAL_ATTEMPTS; i++) {
    const heart = document.createElement('span');
    heart.classList.add('material-symbols-outlined', 'coracao');
    heart.setAttribute('aria-hidden', 'true');
    heart.textContent =
      i < state.remainingAttempts ? 'favorite' : 'heart_broken';
    $remainingAttempts.appendChild(heart);
  }
};

const initOptions = () => {
  const pattern = /^\/quiz(\d+)-/;
  const quizNumber = Number.parseInt(pattern.exec(window.location.pathname)[1]);
  const question = questions[quizNumber - 1];
  const { type } = question;

  if (type === 'single_choice' || type === 'image_choice') {
    $options.forEach(($option) => {
      $option.addEventListener('click', () =>
        onOptionClick($option, question, $btnNext),
      );
    });
  }
};

const onOptionClick = ($option, question, $btnNext) => {
  if ($option.classList.contains('wrong')) return;
  const right = $option.dataset.optionId === question.answer.optionId;

  if (right) {
    $option.classList.add('correct');
    $btnNext.removeAttribute('disabled');
    disableAllOptions();
    return;
  }

  $option.classList.add('wrong', 'shake');
  $option.addEventListener(
    'animationend',
    () => {
      $option.classList.remove('shake');
    },
    { once: true },
  );
  removeHeart();
};

const removeHeart = () => {
  const newRemainingAttempts = Math.max(state.remainingAttempts - 1, 0);
  setState({ remainingAttempts: newRemainingAttempts });

  if (newRemainingAttempts === 0) gameOver();
};

const disableAllOptions = () => {
  $options.forEach(($option) => {
    $option.setAttribute('disabled', 'true');
  });
};

const gameOver = () => {
  disableAllOptions();
  setState({ remainingAttempts: 0 });

  alert('Game over, lil bro');
  window.location.href = '/modulo.html';
};

window.addEventListener('load', () => {
  initState();
  initOptions();

  if (window.location.pathname === '/quiz1-selecione-o-correto.html') {
    setState({ remainingAttempts: 3 });
  }
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

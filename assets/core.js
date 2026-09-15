'use strict';

const STATE_KEY = 'duolibras-state';
const TOTAL_ATTEMPTS = 3;
const DEFAULT_STATE = {
  currentStreak: 0,
  remainingAttempts: 3,
};

const $btnNext = document.getElementById('btn-next');
const $remainingAttempts = document.getElementById('remaining-attempts');

//#region State Management

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
  setState({ ...DEFAULT_STATE, ...currentState });
};

const saveState = () => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const render = () => {
  renderRemainingAttempts();
};

//#endregion

//#region Simple Choice Question

const $options = document.querySelectorAll('.option');

const initOptions = (question) => {
  $options.forEach(($option) => {
    $option.addEventListener('click', () =>
      onOptionClick($option, question),
    );
  });
};

const onOptionClick = ($option, question) => {
  if ($option.classList.contains('wrong')) return;
  const right = $option.dataset.optionId === question.answer.optionId;

  if (right) {
    $option.classList.add('correct');
    enableNextButton();
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
  loseHeart();
};

const disableAllOptions = () => {
  $options.forEach(($option) => {
    $option.setAttribute('disabled', 'true');
  });
};

//#endregion

//#region Order Question

const DRAG_THRESHOLD = 6; // px de tolerância antes de considerar arrasto

const $optionsContainer = document.getElementById('options');
const $answerContainer = document.getElementById('answer');

let $dragged = null;
let startPoint = null;
let hasDragged = false;

const initOrder = (question) => {
  const $checkButton = document.getElementById('btn-check-order');
  $options.forEach(($item) => {
    $item.addEventListener('click', () => onOrderItemClick($item));
  });
  $checkButton.addEventListener('click', (event) => checkOrder(event, question));
};

const onOrderItemClick = ($item) => {
  if ($item.classList.contains('locked')) return;

  const isInLine = $item.parentElement === $answerContainer;

  animateWithFlip(() => {
    if (isInLine) {
      $optionsContainer.appendChild($item);
    } else {
      $answerContainer.appendChild($item);
    }
  });
};

const checkOrder = (event, question) => {
  const currentOrder = [...$answerContainer.querySelectorAll('.option')].map(($item) => $item.dataset.itemId);

  if (currentOrder.length !== question.answer.order.length) {
    animateShake($answerContainer);
    return;
  }

  const isCorrect = currentOrder.every((itemId, index) => itemId === question.answer.order[index]);

  if (isCorrect) {
    $answerContainer.querySelectorAll('.option').forEach(($item) => {
      $item.classList.add('locked');
    });
    event.target.setAttribute('disabled', 'true');
    enableNextButton();
  } else {
    $answerContainer.querySelectorAll('.option:not(.locked)').forEach(($item) => {
      animateShake($item);
    });
    loseHeart();
  }
};

//#endregion

//#region Match Question

let $selected = null;

const initMatch = (question) => {
  document.querySelectorAll('.item-match, .target-match').forEach(($el) => {
    $el.addEventListener('click', () => {
      onMatchElementClick($el, question);
    });
  });
};

const isItem = ($node) => $node.classList.contains('item-match');
const isTarget = ($node) => $node.classList.contains('target-match');

const onMatchElementClick = ($el, question) => {
  if ($el.classList.contains('correct')) return;

  if ($selected === $el) {
    $el.classList.remove('selected');
    $selected = null;
    return;
  }

  if (!$selected) {
    $el.classList.add('selected');
    $selected = $el;
    return;
  }

  const sameSide = isItem($selected) === isItem($el);
  if (sameSide) {
    $selected.classList.remove('selected');
    $el.classList.add('selected');
    $selected = $el;
    return;
  }

  const $item = isItem($selected) ? $selected : $el;
  const $target = isTarget($selected) ? $selected : $el;

  const itemId = $item.dataset.itemId;
  const targetId = $target.dataset.targetId;
  const isCorrect = question.answer.matches.some(
    (match) => match.itemId === itemId && match.targetId === targetId,
  );

  if (!isCorrect) {
    animateShake($item);
    animateShake($target);
    loseHeart();

    $item.classList.remove('selected');
    $target.classList.remove('selected');
    $selected = null;
    return;
  }

  $item.classList.remove('selected');
  $item.classList.add('correct');
  $target.classList.add('correct');
  $selected = null;

  const allResolved =
    document.querySelectorAll('.item-match:not(.correct)').length === 0;
  if (allResolved) enableNextButton();
};

//#endregion

//#region Misc

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

const loseHeart = () => {
  const newRemainingAttempts = Math.max(state.remainingAttempts - 1, 0);
  setState({ remainingAttempts: newRemainingAttempts });

  if (newRemainingAttempts === 0) gameOver();
};

const gameOver = () => {
  disableAllOptions();
  setState({ remainingAttempts: 0 });

  alert('Suas tentativas acabaram!');
  window.location.href = '/modulo.html';
};

const animateShake = ($el) => {
  $el.classList.add('shake');
  $el.addEventListener(
    'animationend',
    () => {
      $el.classList.remove('shake');
    },
    { once: true },
  );
};

const enableNextButton = () => {
  if (!$btnNext) {
    alert('Parabéns! Você concluiu o quiz!');
    window.location.href = '/home.html';
    return;
  }
  $btnNext.removeAttribute('disabled');
};

// agradecimentos ao chatgpt pelo flip animation <3
const animateWithFlip = (changeFn) => {
  const $allItems = document.querySelectorAll('.option');
  const positionsBefore = new Map();

  $allItems.forEach(($item) => {
    positionsBefore.set($item, $item.getBoundingClientRect());
  });

  changeFn();

  $allItems.forEach(($item) => {
    const before = positionsBefore.get($item);
    const after = $item.getBoundingClientRect();

    const deltaX = before.left - after.left;
    const deltaY = before.top - after.top;

    if (deltaX === 0 || deltaY === 0) return;

    $item.style.transition = 'none';
    $item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    requestAnimationFrame(() => {
      $item.style.transition = 'transform 0.25s ease';
      $item.style.transform = '';
    });

    $item.addEventListener('transitionend', () => {
      $item.style.transition = '';
    }, { once: true });
  });
};

//#endregion

window.addEventListener('load', () => {
  initState();

  const pattern = /^\/quiz(\d+)-/;
  const quizNumber = Number.parseInt(pattern.exec(window.location.pathname)[1]);
  const question = questions[quizNumber - 1];
  const { type } = question;

  if (quizNumber === 1) {
    setState({ remainingAttempts: TOTAL_ATTEMPTS });
  }

  switch (type) {
    case 'single_choice':
    case 'image_choice':
      initOptions(question);
      break;
    case 'order':
      initOrder(question);
      break;
    case 'match':
      initMatch(question);
      break;
    default:
      console.error(`Tipo de questão não suportado: ${type}`);
      break;
  }
});

//#region Questões

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

//#endregion

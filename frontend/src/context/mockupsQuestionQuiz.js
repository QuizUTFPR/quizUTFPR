export const TrueOrFalseAnswer = [
  {
    id: -1,
    title: 'Verdadeiro',
    isCorrect: true,
  },
  {
    id: -1,
    title: 'Falso',
    isCorrect: false,
  },
];

export const MultipleChoiceAnswer = [
  {
    id: -1,
    title: '',
    isCorrect: false,
  },
  {
    id: -1,
    title: '',
    isCorrect: false,
  },
  {
    id: -1,
    title: '',
    isCorrect: false,
  },
  {
    id: -1,
    title: '',
    isCorrect: false,
  },
];

export const MockupQuestionTrueOrFalse = {
  id: -1,
  type: 'singleChoice',
  copy: false,
  title: '',
  timer: 30,
  imageObj: null,
  imageUrl: '',
  difficultyLevel: 'Fácil',
  availableOnQuestionsDB: false,
  answer: TrueOrFalseAnswer,
  tags: [],
};

export const MockupQuestionMultipleChoice = {
  id: -1,
  type: 'multipleChoice',
  copy: false,
  title: '',
  timer: 30,
  difficultyLevel: 'Fácil',
  imageObj: null,
  imageUrl: '',
  availableOnQuestionsDB: false,
  answer: MultipleChoiceAnswer,
  tags: [],
};

export const initialValue = [
  {
    id: -1,
    type: 'multipleChoice',
    copy: false,
    title: '',
    timer: 30,
    imageObj: null,
    imageUrl: '',
    difficultyLevel: 'Fácil',
    availableOnQuestionsDB: false,
    answer: MultipleChoiceAnswer,
    tags: [],
    index: 0,
  },
];

export const initialValueErrors = {
  title: false,
  isCorrect: false,
  answer: false,
};

export const OptionsOfTime = {
  '4 minutos': 240,
  '3 minutos': 180,
  '1 minuto': 120,
  '60 segundos': 60,
  '45 segundos': 45,
  '30 segundos': 30,
  '15 segundos': 15,
  '10 segundos': 10,
};

export const optionsOfDifficultyLevel = {
  'Muito Fácil': 'Muito Fácil',
  Fácil: 'Fácil',
  Médio: 'Médio',
  Difícil: 'Difícil',
  'Muito Difícil': 'Muito Difícil',
};

export const excelTypeOfQuestion = {
  'MÚLTIPLA ESCOLHA': 'multipleChoice',
  'V OU F': 'singleChoice',
};

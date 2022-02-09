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
  type: 'single_choice',
  copy: false,
  title: '',
  timer: 30,
  imageObj: null,
  // imageUrl: '',
  imageBase64: '',
  difficultyLevel: 'Fácil',
  availableOnQuestionsDB: false,
  answer: TrueOrFalseAnswer,
  tags: [],
};

export const MockupQuestionMultipleChoice = {
  id: -1,
  type: 'multiple_choice',
  copy: false,
  title: '',
  timer: 30,
  difficultyLevel: 'Fácil',
  imageObj: null,
  // imageUrl: '',
  imageBase64: '',
  availableOnQuestionsDB: false,
  answer: MultipleChoiceAnswer,
  tags: [],
};

export const initialValue = [
  {
    id: -1,
    type: 'multiple_choice',
    copy: false,
    title: '',
    timer: 30,
    imageObj: null,
    // imageUrl: '',
    imageBase64: '',
    difficultyLevel: 'Fácil',
    availableOnQuestionsDB: false,
    answer: MultipleChoiceAnswer,
    tags: [],
  },
];

export const initialValueErrors = {
  title: false,
  isCorrect: false,
  answer: false,
};

export const TrueOrFalseAnswer = [
  {
    id: -1,
    title: 'Verdadeiro',
    is_correct: false,
  },
  {
    id: -1,
    title: 'Falso',
    is_correct: false,
  },
];

export const MultipleChoiceAnswer = [
  {
    id: -1,
    title: '',
    is_correct: false,
  },
  {
    id: -1,
    title: '',
    is_correct: false,
  },
  {
    id: -1,
    title: '',
    is_correct: false,
  },
  {
    id: -1,
    title: '',
    is_correct: false,
  },
];

export const MockupQuestionTrueOrFalse = {
  id: -1,
  copy: false,
  title: '',
  timer: 30,
  imageObj: null,
  imageUrl: '',
  difficultyLevel: 3,
  availableOnQuestionsDB: false,
  answer: TrueOrFalseAnswer,
  tags: [],
};

export const MockupQuestionMultipleChoice = {
  id: -1,
  copy: false,
  title: '',
  timer: 30,
  difficultyLevel: 3,
  imageObj: null,
  imageUrl: '',
  availableOnQuestionsDB: false,
  answer: MultipleChoiceAnswer,
  tags: [],
};

export const initialValue = [
  {
    id: -1,
    copy: false,
    title: '',
    timer: 30,
    imageObj: null,
    imageUrl: '',
    difficultyLevel: 3,
    availableOnQuestionsDB: false,
    answer: MultipleChoiceAnswer,
    tags: [],
  },
];

export const initialValueErrors = {
  title: false,
  is_correct: false,
  answer: false,
};

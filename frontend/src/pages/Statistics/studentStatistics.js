const teste = {
  questions: [
    {
      id: 1,
      title:
        'Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?',
      index: 0,
      timer: 30,
      score: 40,
      difficultyLevel: 'Muito Difícil',
      type: 'multipleChoice',
      answer: [
        {
          id: 1,
          title: 'Tem entre 2 a 4 litros. São retirados 450 mililitros',
          isCorrect: false,
        },
        {
          id: 2,
          title: 'Tem entre 4 a 6 litros. São retirados 450 mililitros',
          isCorrect: true,
        },
        {
          id: 3,
          title: 'Tem 10 litros. São retirados 2 litros',
          isCorrect: false,
        },
        {
          id: 4,
          title: 'Tem 7 litros. São retirados 1,5 litros',
          isCorrect: false,
        },
      ],
    },
    {
      id: 5,
      title: 'De quem é a famosa frase “Penso, logo existo”?',
      index: 1,
      timer: 30,
      score: 15,
      difficultyLevel: 'Médio',
      type: 'multipleChoice',
      answer: [
        {
          id: 17,
          title: 'Platão',
          isCorrect: false,
        },
        {
          id: 18,
          title: 'Galileu Galilei',
          isCorrect: false,
        },
        {
          id: 19,
          title: 'Descartes',
          isCorrect: true,
        },
        {
          id: 20,
          title: 'Sócrates',
          isCorrect: false,
        },
      ],
    },
    {
      id: 2,
      title: 'De onde é a invenção do chuveiro elétrico?',
      index: 2,
      timer: 30,
      score: 15,
      difficultyLevel: 'Médio',
      type: 'multipleChoice',
      answer: [
        {
          id: 13,
          title: 'França',
          isCorrect: false,
        },
        {
          id: 14,
          title: 'Inglaterra',
          isCorrect: false,
        },
        {
          id: 15,
          title: 'Brasil',
          isCorrect: true,
        },
        {
          id: 16,
          title: 'Austrália',
          isCorrect: false,
        },
      ],
    },
    {
      id: 6,
      title: 'Quantas casas decimais tem o número pi?',
      index: 3,
      timer: 30,
      score: 10,
      difficultyLevel: 'Fácil',
      type: 'multipleChoice',
      answer: [
        {
          id: 5,
          title: 'Centenas',
          isCorrect: false,
        },
        {
          id: 6,
          title: 'Infinitas',
          isCorrect: true,
        },
        {
          id: 7,
          title: 'Vinte',
          isCorrect: false,
        },
        {
          id: 8,
          title: 'Duas',
          isCorrect: false,
        },
      ],
    },
    {
      id: 3,
      title:
        'Atualmente, quantos elementos químicos a tabela periódica possui?',
      index: 4,
      timer: 30,
      score: 15,
      difficultyLevel: 'Médio',
      type: 'multipleChoice',
      answer: [
        {
          id: 9,
          title: '113',
          isCorrect: false,
        },
        {
          id: 10,
          title: '109',
          isCorrect: false,
        },
        {
          id: 11,
          title: '108',
          isCorrect: false,
        },
        {
          id: 12,
          title: '118',
          isCorrect: true,
        },
      ],
    },
    {
      id: 7,
      title: 'Qual o número mínimo de jogadores numa partida de futebol?',
      index: 5,
      timer: 30,
      score: 15,
      difficultyLevel: 'Médio',
      type: 'multipleChoice',
      answer: [
        {
          id: 25,
          title: '8',
          isCorrect: false,
        },
        {
          id: 26,
          title: '9',
          isCorrect: false,
        },
        {
          id: 27,
          title: '7',
          isCorrect: true,
        },
        {
          id: 28,
          title: '10',
          isCorrect: false,
        },
      ],
    },
    {
      id: 4,
      title:
        'Qual era o nome do tratado que a Alemanha foi obrigada a assinar após a Primeira Guerra Mundial, que limitava seus poderes e a considerava a única culpada pelo conflito?',
      index: 6,
      timer: 30,
      score: 15,
      difficultyLevel: 'Médio',
      type: 'multipleChoice',
      answer: [
        {
          id: 21,
          title: 'Tratado de Amsterdã',
          isCorrect: false,
        },
        {
          id: 22,
          title: 'Tratado de Badajós',
          isCorrect: false,
        },
        {
          id: 23,
          title: 'Tratado de Versalhes',
          isCorrect: true,
        },
        {
          id: 24,
          title: 'Tratado de Tordesilhas',
          isCorrect: false,
        },
      ],
    },
  ],
  studentQuiz: [
    {
      id: 1,
      name: 'celso',
      email: 'celso@gmail.com',
      studentQuiz: {
        id: 1,
        score: 0,
        studentId: 1,
        quizQuestionChoice: [
          {
            id: 1,
            timeLeft: 2,
            questionId: 1,
            checked1: true,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 2,
            timeLeft: 10,
            questionId: 5,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: true,
          },
          {
            id: 3,
            timeLeft: 18,
            questionId: 2,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 4,
            timeLeft: 6,
            questionId: 6,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 5,
            timeLeft: 14,
            questionId: 3,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 6,
            timeLeft: 5,
            questionId: 7,
            checked1: true,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 7,
            timeLeft: 3,
            questionId: 4,
            checked1: true,
            checked2: false,
            checked3: false,
            checked4: false,
          },
        ],
      },
    },
    {
      id: 2,
      name: 'kamilinhna',
      email: 'kamilicunha@hotmail.com',
      studentQuiz: {
        id: 3,
        score: 135,
        studentId: 2,
        quizQuestionChoice: [
          {
            id: 16,
            timeLeft: 12,
            questionId: 1,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 17,
            timeLeft: 21,
            questionId: 5,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: true,
          },
          {
            id: 18,
            timeLeft: 21,
            questionId: 2,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 19,
            timeLeft: 23,
            questionId: 6,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 20,
            timeLeft: 24,
            questionId: 3,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: true,
          },
          {
            id: 21,
            timeLeft: 7,
            questionId: 7,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 22,
            timeLeft: 12,
            questionId: 4,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
        ],
      },
    },
    {
      id: 3,
      name: 'Jhonatan',
      email: '123@gmail.com',
      studentQuiz: {
        id: 46,
        score: 393,
        studentId: 3,
        quizQuestionChoice: [
          {
            id: 164,
            timeLeft: 28,
            questionId: 1,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 165,
            timeLeft: 26,
            questionId: 5,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 166,
            timeLeft: 29,
            questionId: 2,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 167,
            timeLeft: 29,
            questionId: 6,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 168,
            timeLeft: 29,
            questionId: 3,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: true,
          },
          {
            id: 169,
            timeLeft: 28,
            questionId: 7,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: true,
          },
          {
            id: 170,
            timeLeft: 27,
            questionId: 4,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
        ],
      },
    },
    {
      id: 4,
      name: 'Marcos Silvano',
      email: 'marcos@gmail.com',
      studentQuiz: {
        id: 25,
        score: 181,
        studentId: 4,
        quizQuestionChoice: [
          {
            id: 108,
            timeLeft: 22,
            questionId: 1,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 109,
            timeLeft: 29,
            questionId: 5,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 110,
            timeLeft: 29,
            questionId: 2,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 111,
            timeLeft: 29,
            questionId: 6,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 112,
            timeLeft: 29,
            questionId: 3,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: true,
          },
          {
            id: 113,
            timeLeft: 29,
            questionId: 7,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
          {
            id: 114,
            timeLeft: 29,
            questionId: 4,
            checked1: false,
            checked2: false,
            checked3: true,
            checked4: false,
          },
        ],
      },
    },
    {
      id: 6,
      name: 'testenildo',
      email: 'teste@aluno.com',
      studentQuiz: {
        id: 41,
        score: 0,
        studentId: 6,
        quizQuestionChoice: [
          {
            id: 129,
            timeLeft: 10,
            questionId: 1,
            checked1: true,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 130,
            timeLeft: 0,
            questionId: 2,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 131,
            timeLeft: 0,
            questionId: 3,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 132,
            timeLeft: 0,
            questionId: 4,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 133,
            timeLeft: 0,
            questionId: 5,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 134,
            timeLeft: 0,
            questionId: 6,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 135,
            timeLeft: 0,
            questionId: 7,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
        ],
      },
    },
    {
      id: 7,
      name: 'vazonildo',
      email: 'taaaa@aluno.com',
      studentQuiz: {
        id: 43,
        score: 16,
        studentId: 7,
        quizQuestionChoice: [
          {
            id: 143,
            timeLeft: 10,
            questionId: 1,
            checked1: false,
            checked2: true,
            checked3: false,
            checked4: false,
          },
          {
            id: 144,
            timeLeft: 0,
            questionId: 2,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 145,
            timeLeft: 0,
            questionId: 3,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 146,
            timeLeft: 0,
            questionId: 4,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 147,
            timeLeft: 0,
            questionId: 5,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 148,
            timeLeft: 0,
            questionId: 6,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
          {
            id: 149,
            timeLeft: 0,
            questionId: 7,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
          },
        ],
      },
    },
  ],
};

export default teste;

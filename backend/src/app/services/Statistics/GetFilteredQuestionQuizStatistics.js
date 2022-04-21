// MODELS
import Answer from '../../models/AnswerModel';
import StudentQuiz from '../../models/StudentQuiz';
import Student from '../../models/StudentModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

class GetFilteredQuestionQuizStatisticsService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  getPositionGraphObject(value) {
    let result;

    if (value <= 10) {
      result = '0-10%';
    } else if (value <= 20) {
      result = '10%-20%';
    } else if (value <= 30) {
      result = '20%-30%';
    } else if (value <= 40) {
      result = '30%-40%';
    } else if (value <= 50) {
      result = '40%-50%';
    } else if (value <= 60) {
      result = '50%-60%';
    } else if (value <= 70) {
      result = '60%-70%';
    } else if (value <= 80) {
      result = '70%-80%';
    } else if (value <= 90) {
      result = '80%-90%';
    } else {
      result = '90%-100%';
    }

    return result;
  }

  async execute(data) {
    const { quizId, classId, orderBy } = data;

    const quiz = await this.quizRepository.findByPk(quizId, {
      attributes: ['id', 'title', 'pin'],
    });

    if (!quiz) {
      const error = new Error();
      error.status = 404;
      error.response = 'Quiz não encontrado!';
      throw error;
    }

    const questions = await quiz.getQuestions({
      joinTableAttributes: [],
      include: [
        {
          model: Answer,
          as: 'answer',
          attributes: ['id', 'title', 'isCorrect'],
        },
      ],
      attributes: [
        'id',
        'title',
        'index',
        'timer',
        'score',
        'difficultyLevel',
        'type',
      ],
      order: [
        ['index', 'ASC'],
        [
          {
            model: Answer,
            as: 'answer',
          },
          'id',
          'ASC',
        ],
      ],
    });

    if (!questions) {
      const error = new Error();
      error.status = 204;
      error.response = 'Quiz não possui questões cadastradas!';
      throw error;
    }

    const whereCondition = classId
      ? {
          where: {
            isFinished: true,
            classId,
          },
        }
      : { where: { isFinished: true } };

    // GETTING ALL THE STUDENT THAT ANSWERED THE QUIZ
    const studentQuizAttempt = await quiz.getQuizStudent({
      ...whereCondition,
      attributes: ['studentId', 'quizId'],
      group: ['studentId'],
    });

    let optionOrderBy;
    let errorOrderBy;
    switch (orderBy) {
      case 'best':
        optionOrderBy = {
          order: [
            [
              {
                model: StudentQuiz,
                as: 'studentQuiz',
              },
              'score',
              'DESC',
            ],
          ],
        };
        break;

      case 'worst':
        optionOrderBy = {
          order: [
            [
              {
                model: StudentQuiz,
                as: 'studentQuiz',
              },
              'score',
              'ASC',
            ],
          ],
        };
        break;

      case 'first':
        optionOrderBy = {
          order: [
            [
              {
                model: StudentQuiz,
                as: 'studentQuiz',
              },
              'createdAt',
              'ASC',
            ],
          ],
        };
        break;

      default:
        errorOrderBy = new Error();
        errorOrderBy.status = 404;
        errorOrderBy.response = 'Opção de orderBy inexistente!';
        throw errorOrderBy;
    }

    // GETTING THE ATTEMPT FROM EACH STUDENT CONSIDERING THE HIGHEST SCORE
    // AND RETURN AN ARRAY OF ID ABOUT THE BEST ATTEMPT
    const ArrayOfIDAboutBestScoreAttemptQuiz = await Promise.all(
      studentQuizAttempt.map(async (choice) => {
        const student = await choice.getStudent({
          include: [
            {
              model: StudentQuiz,
              as: 'studentQuiz',
              where: {
                quizId,
                isFinished: true,
              },
              attributes: ['id', 'score'],
            },
          ],
          ...optionOrderBy,
        });

        return student.studentQuiz[0].id;
      })
    );

    let percentageOfQuizHit = 0; // % OF CORRECT ANSWERS CHOICES OF THE STUDENT
    const countOfEachPorcentage = {
      '0-10%': 0,
      '10%-20%': 0,
      '20%-30%': 0,
      '30%-40%': 0,
      '40%-50%': 0,
      '50%-60%': 0,
      '60%-70%': 0,
      '70%-80%': 0,
      '80%-90%': 0,
      '90%-100%': 0,
    };

    // INCLUDING IN THE QUESTION ALL THE CHOICES OF THE STUDENT
    // WE ONLY CONSIDER THE CHOICE ABOUT THE BEST SCORE
    const returnedQuestions = await Promise.all(
      questions.map(async (question) => {
        const questionChoice = await question.getQuestionChoice({
          where: {
            studentQuizId: ArrayOfIDAboutBestScoreAttemptQuiz,
          },
          attributes: [
            'studentQuizId',
            'studentId',
            'timeLeft',
            'checked1',
            'checked2',
            'checked3',
            'checked4',
          ],
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['name', 'email'],
            },
          ],
        });

        let sumOfTimeSpentToAnswer = 0; // AVG OF TIME THAT WAS SPENT TO ANSWER THE QUESTION
        // eslint-disable-next-line array-callback-return
        questionChoice.map((questionMapItem) => {
          sumOfTimeSpentToAnswer += question.timer - questionMapItem.timeLeft;
        });

        const avgOfTimeSpentToAnswer =
          sumOfTimeSpentToAnswer / questionChoice.length;

        // CALCULATING HOW MANY TIMES EACH ANSWER HAD BEEN CHOOSED
        const { answer } = question;
        if (answer[0]) answer[0].dataValues.numberOfChoices = 0;
        if (answer[1]) answer[1].dataValues.numberOfChoices = 0;
        if (answer[2]) answer[2].dataValues.numberOfChoices = 0;
        if (answer[3]) answer[3].dataValues.numberOfChoices = 0;

        let hitAmount = 0; // SUM OF HIT (CORRECT ANSWER)
        let amountOfCorrectOptions = 0;
        // eslint-disable-next-line array-callback-return

        questionChoice.forEach((choice) => {
          const { checked1, checked2, checked3, checked4 } = choice;
          let hasWrongChoice = false;
          let hitAmountChoice = 0;

          // necessario if's abaxo pq se estudante não marcar nenhum correta temos q calcular a quantidade de alternativas corretas
          if (answer[0]?.dataValues?.isCorrect) amountOfCorrectOptions += 1;
          if (answer[1]?.dataValues?.isCorrect) amountOfCorrectOptions += 1;
          if (answer[2]?.dataValues?.isCorrect) amountOfCorrectOptions += 1;
          if (answer[3]?.dataValues?.isCorrect) amountOfCorrectOptions += 1;

          if (checked1) {
            answer[0].dataValues.numberOfChoices += 1;
            if (answer[0].dataValues.isCorrect && !hasWrongChoice)
              hitAmountChoice += 1;
            else hasWrongChoice = true;
          }
          if (checked2) {
            answer[1].dataValues.numberOfChoices += 1;
            if (answer[1].dataValues.isCorrect && !hasWrongChoice)
              hitAmountChoice += 1;
            else hasWrongChoice = true;
          }
          if (checked3) {
            answer[2].dataValues.numberOfChoices += 1;
            if (answer[2].dataValues.isCorrect && !hasWrongChoice)
              hitAmountChoice += 1;
            else hasWrongChoice = true;
          }
          if (checked4) {
            answer[3].dataValues.numberOfChoices += 1;
            if (answer[3].dataValues.isCorrect && !hasWrongChoice)
              hitAmountChoice += 1;
            else hasWrongChoice = true;
          }

          if (!hasWrongChoice) hitAmount += hitAmountChoice;
        });

        const percentageOfHit = (hitAmount * 100) / amountOfCorrectOptions;
        percentageOfQuizHit += percentageOfHit;

        const roundedPercentageOfHit = Math.floor(percentageOfHit);

        const position = this.getPositionGraphObject(roundedPercentageOfHit);

        countOfEachPorcentage[position] += 1;

        return {
          avgOfTimeSpentToAnswer: avgOfTimeSpentToAnswer.toFixed(2),
          percentageOfHit: percentageOfHit.toFixed(2),
          ...question.dataValues,
          answer,
          questionChoice,
        };
      })
    );

    percentageOfQuizHit /= questions.length;

    return {
      quiz,
      percentageOfQuizHit,
      questions: returnedQuestions,
      countOfEachPorcentage: Object.entries(countOfEachPorcentage).sort(
        (a, b) => a[0] - b[0]
      ),
    };
  }
}

export default new GetFilteredQuestionQuizStatisticsService();

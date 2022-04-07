// MODELS
import Answer from '../../models/AnswerModel';
import StudentQuiz from '../../models/StudentQuiz';
import StudentQuestionChoice from '../../models/StudentQuestionChoice';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

// SERVICES
import FilteredByAttemptService from './GetStudentQuizFilteredByAttempt';

class GetStudentQuizStatisticsService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async execute(data) {
    const { quizId, orderBy } = data;

    const quiz = await this.quizRepository.findByPk(quizId, {
      attributes: [
        'id',
        'title',
        'description',
        'visibility',
        'idImage',
        'pin',
        'noTime',
      ],
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

    //  GETTING ALL THE STUDENT THAT ANSWERED THE QUIZ
    const studentQuizAttempt = await quiz.getQuizStudent({
      where: {
        isFinished: true,
      },
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
            // [
            //   { model: StudentQuiz, as: 'studentQuiz' },
            //   { model: StudentQuestionChoice, as: 'quizQuestionChoice' },
            //   'id',
            //   'ASC',
            // ],
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

    const studentQuiz = await Promise.all(
      studentQuizAttempt.map(async (choice) => {
        const student = await FilteredByAttemptService.execute({
          choice,
          query: {
            attributes: ['id', 'name', 'email'],
            include: [
              {
                model: StudentQuiz,
                as: 'studentQuiz',
                where: {
                  quizId,
                  isFinished: true,
                },
                attributes: [
                  'id',
                  ['hit_amount', 'score'],
                  ['score', 'oldWayToCalculeteScore'],
                  'studentId',
                ],
                include: [
                  {
                    model: StudentQuestionChoice,
                    as: 'quizQuestionChoice',
                    attributes: [
                      'id',
                      'timeLeft',
                      'questionId',
                      'checked1',
                      'checked2',
                      'checked3',
                      'checked4',
                    ],
                  },
                ],
              },
            ],
          },
          optionOrderBy,
        });

        return student;
      })
    );

    return { questions, studentQuiz };
  }
}

export default new GetStudentQuizStatisticsService();

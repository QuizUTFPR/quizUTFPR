import * as Yup from 'yup';

// MODELS
import Answer from '../../models/AnswerModel';
import StudentQuiz from '../../models/StudentQuiz';
import StudentQuestionChoice from '../../models/StudentQuestionChoice';

// REPOSITORIES
import ClassRepository from '../../repositories/Class';
import QuizRepository from '../../repositories/Quiz';

class GetFilteredStudentQuizStatisticsService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.classRepository = new ClassRepository();
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
    const schema = Yup.object().shape({
      quizId: Yup.string().required(),
      classId: Yup.string().nullable(),
      orderBy: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { quizId, classId, orderBy } = data;

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

    const whereCondition = classId
      ? {
          where: {
            isFinished: true,
            classId,
          },
        }
      : { where: { isFinished: true } };

    const studentsWhoAnswered = await quiz.getQuizStudent({
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

    // GET ATTEMPTS FROM STUDENTS
    const studentQuiz = await Promise.all(
      studentsWhoAnswered.map(async (choice) => {
        const student = await choice.getStudent({
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
          ...optionOrderBy,
        });

        const { studentQuiz: itemStudentQuiz } = student.dataValues;
        const { score } = itemStudentQuiz[0].dataValues;

        const key = this.getPositionGraphObject(
          (score * 100) / questions.length
        );
        countOfEachPorcentage[key] += 1;

        return {
          ...student.dataValues,
          studentQuiz: student.studentQuiz[0],
        };
      })
    );

    return {
      quiz,
      questions,
      studentQuiz,
      countOfEachPorcentage: Object.entries(countOfEachPorcentage).sort(
        (a, b) => a[0] - b[0]
      ),
    };
  }
}

export default new GetFilteredStudentQuizStatisticsService();

import * as Yup from 'yup';
import { Op } from 'sequelize';
// import getAllMethods from '../../utils/getMethodsOfAssociation';

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

  async execute(data) {
    const schema = Yup.object().shape({
      quizId: Yup.string().required(),
      classId: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { quizId, classId } = data;

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

    const classInstance = await this.classRepository.findById(classId);

    if (!classInstance) {
      const error = new Error();
      error.status = 204;
      error.response = 'Esta turma não está cadastrada no banco.';
      throw error;
    }

    const classStudents = await classInstance.getClass_students();
    const classStudentsId = classStudents.map(
      (classStudent) => classStudent.dataValues.id
    );

    const studentsWhoAnswered = await quiz.getQuizStudent({
      where: {
        isFinished: true,
        studentId: {
          [Op.in]: classStudentsId,
        },
      },
      attributes: ['studentId', 'quizId'],
      group: ['studentId'],
    });

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
              attributes: ['id', 'score', 'studentId'],
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
          order: [
            [{ model: StudentQuiz, as: 'studentQuiz' }, 'score', 'DESC'],
            [
              { model: StudentQuiz, as: 'studentQuiz' },
              { model: StudentQuestionChoice, as: 'quizQuestionChoice' },
              'id',
              'ASC',
            ],
          ],
        });

        return {
          ...student.dataValues,
          studentQuiz: student.studentQuiz[0],
        };
      })
    );

    return { questions, studentQuiz };
  }
}

export default new GetFilteredStudentQuizStatisticsService();

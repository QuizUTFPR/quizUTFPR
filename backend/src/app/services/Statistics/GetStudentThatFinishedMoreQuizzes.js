import * as Yup from 'yup';

// MODELS
import StudentQuiz from '../../models/StudentQuiz';

// REPOSITORIES
import ClassRepository from '../../repositories/Class';

class GetFilteredStudentQuizStatisticsService {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      classId: Yup.string(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { classId } = data;

    const classInstance = await this.classRepository.findById(classId);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const studentsFromClass = await this.classRepository.getAllStudents(
      classInstance,
      {
        attributes: ['id', 'name', 'url_image', 'email'],
        include: [
          {
            model: StudentQuiz,
            as: 'studentQuiz',
            where: {
              classId,
              isFinished: true,
            },
            required: false,
          },
        ],
      }
    );

    if (!studentsFromClass) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhum estudante inscrito na Turma!';
      throw error;
    }

    const amountOfQuizzes = await this.classRepository.getCountClassQuizzes(
      classInstance
    );

    const formattedData = studentsFromClass.map((attemptFinished) => {
      const hashTableThatContainsAllTheIdQuizzesAnswered = {};
      const { studentQuiz, student_class, ...rest } =
        attemptFinished.dataValues;

      studentQuiz.forEach((attempt) => {
        const { quizId } = attempt;

        if (!hashTableThatContainsAllTheIdQuizzesAnswered[quizId]) {
          hashTableThatContainsAllTheIdQuizzesAnswered[quizId] = 1;
        }
      });

      return {
        ...rest,
        total: amountOfQuizzes,
        totalHit: Object.keys(hashTableThatContainsAllTheIdQuizzesAnswered)
          .length,
      };
    });

    return formattedData.sort(
      (a, b) => b.amountOfQuizzesFinished - a.amountOfQuizzesFinished
    );
  }
}

export default new GetFilteredStudentQuizStatisticsService();

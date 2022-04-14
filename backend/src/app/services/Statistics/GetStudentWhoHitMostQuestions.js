import * as Yup from 'yup';

// MODELS
import StudentQuiz from '../../models/StudentQuiz';
import File from '../../models/FileModel';

// REPOSITORIES
import ClassRepository from '../../repositories/Class';

class GetStudentWhoHitMostQuestions {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      classId: Yup.string().nullable(),
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
        attributes: ['id', 'name', 'ra', 'email'],
        include: [
          {
            model: File,
            as: 'imageProfile',
            attributes: ['url', 'path'],
          },
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

    const formattedData = studentsFromClass.map((attemptFinished) => {
      const hashTableThatContainsAllTheIdQuizzesAnswered = {};
      const { studentQuiz, student_class, ...rest } =
        attemptFinished.dataValues;

      studentQuiz.forEach((attempt) => {
        const { quizId, hitAmount } = attempt;

        if (!hashTableThatContainsAllTheIdQuizzesAnswered[quizId]) {
          hashTableThatContainsAllTheIdQuizzesAnswered[quizId] = hitAmount;
        } else {
          const actualValue =
            hashTableThatContainsAllTheIdQuizzesAnswered[quizId];
          hashTableThatContainsAllTheIdQuizzesAnswered[quizId] =
            hitAmount >= actualValue ? hitAmount : actualValue;
        }
      });

      const arrayOfHitAmount = Object.values(
        hashTableThatContainsAllTheIdQuizzesAnswered
      );
      return {
        ...rest,
        totalHitAmount: arrayOfHitAmount.length
          ? arrayOfHitAmount.reduce((a, b) => a + b)
          : 0,
      };
    });

    return formattedData.sort((a, b) => b.totalHitAmount - a.totalHitAmount);
  }
}

export default new GetStudentWhoHitMostQuestions();

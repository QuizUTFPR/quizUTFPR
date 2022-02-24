import * as Yup from 'yup';
import { Op } from 'sequelize';

// REPOSITORIES
import QuizRepository from '../../../repositories/Quiz';
import ClassRepository from '../../../repositories/Class';

// MODELS
import File from '../../../models/FileModel';

class GetAllAvailableQuizzesService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idClass: Yup.string().required(),
      idTeacher: Yup.number().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idClass, idTeacher } = data;

    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 204;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const classQuizzes = await classInstance.getClass_quizzes();

    const idClassQuizzes = classQuizzes.map((classQuiz) => classQuiz.id);

    const availableQuizzes = await this.quizRepository.findAll({
      where: {
        idTeacher,
        published: true,
        id: {
          [Op.notIn]: idClassQuizzes,
        },
      },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['url', 'path'],
        },
      ],
    });

    if (!availableQuizzes.length) {
      const error = new Error();
      error.status = 204;
      error.response = 'Quizzes inexistentes!';
      throw error;
    }

    return availableQuizzes;
  }
}

export default new GetAllAvailableQuizzesService();

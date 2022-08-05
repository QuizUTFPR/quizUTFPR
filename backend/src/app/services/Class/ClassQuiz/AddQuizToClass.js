import * as Yup from 'yup';

// REPOSITORIES
import ClassRepository from '../../../repositories/Class';
import QuizRepository from '../../../repositories/Quiz';

class AddQuizToClassService {
  constructor() {
    this.classRepository = new ClassRepository();
    this.quizRepository = new QuizRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idClass: Yup.string().required(),
      idQuiz: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idClass, idQuiz } = data;
    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const quizInstance = await this.quizRepository.findByPk(idQuiz);

    if (!quizInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Quiz inexistente!';
      throw error;
    }

    await classInstance.addClass_quiz(quizInstance);
    return classInstance;
  }
}

export default new AddQuizToClassService();

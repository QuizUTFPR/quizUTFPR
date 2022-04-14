import * as Yup from 'yup';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

class GetAllQuizClassesService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async execute(data) {
    const schema = Yup.object.shape({
      idQuiz: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idQuiz } = data;
    const quiz = this.quizRepository.findByPk(idQuiz);

    if (!quiz) {
      const error = new Error();
      error.status = 404;
      error.response = 'Quiz inexistente!';
    }
  }
}

export default new GetAllQuizClassesService();

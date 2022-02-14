import * as Yup from 'yup';

// REPOSITORIES
import FavoriteStudentQuizRepository from '../../repositories/FavoriteStudentQuiz';

class CreateFavoriteStudentQuizService {
  constructor() {
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      quizId: Yup.string().required(),
    });

    // Check body of requisition
    if (!(await schema.isValid(data.body))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Corpo da requisição inválido!';
      throw error;
    }

    const studentId = data.userId;
    const { quizId } = data.body;

    const favorite = await this.favoriteStudentQuizRepository.create({
      quizId,
      studentId,
    });

    return favorite;
  }
}

export default new CreateFavoriteStudentQuizService();

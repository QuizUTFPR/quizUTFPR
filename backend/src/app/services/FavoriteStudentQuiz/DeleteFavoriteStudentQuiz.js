import * as Yup from 'yup';

// REPOSITORIES
import FavoriteStudentQuizRepository from '../../repositories/FavoriteStudentQuiz';

class DeleteFavoriteStudentQuizService {
  constructor() {
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      quizId: Yup.string().required(),
    });

    // Check body of requisiton
    if (!(await schema.isValid(data.query))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Corpo de requisição inválido!';
      throw error;
    }

    const studentId = data.userId;
    const { quizId } = data.query;

    const favorite = await this.favoriteStudentQuizRepository.findOne({
      where: {
        quizId,
        studentId,
      },
    });

    favorite.destroy();
  }
}

export default new DeleteFavoriteStudentQuizService();

// SERVICES
import GetFavoriteStudentQuizService from '../../services/FavoriteStudentQuiz/GetFavoriteStudentQuiz';
import CreateFavoriteStudentQuizService from '../../services/FavoriteStudentQuiz/CreateFavoriteStudentQuiz';
import DeleteFavoriteStudentQuizService from '../../services/FavoriteStudentQuiz/DeleteFavoriteStudentQuiz';

class FavoriteStudentQuizController {
  // Exibe todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;
      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const favorites = await GetFavoriteStudentQuizService.execute({
        studentId,
        page,
        limit,
      });

      return res.status(200).json(favorites);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error.response)
      );
    }
  }

  // Cadastra um único registro
  async store(req, res) {
    try {
      const favorite = await CreateFavoriteStudentQuizService.execute(req);

      return res.status(200).json(favorite);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }

  async delete(req, res) {
    try {
      await DeleteFavoriteStudentQuizService.execute(req);

      return res.status(200).json();
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new FavoriteStudentQuizController();

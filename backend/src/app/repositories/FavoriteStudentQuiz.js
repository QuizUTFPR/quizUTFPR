import FavoriteStudentQuiz from '../models/FavoriteStudentQuiz';

class FavoriteStudentQuizRepository {
  async findAll(props) {
    return FavoriteStudentQuiz.findAll({
      attributes: ['quizId'],
      ...props,
    });
  }

  async create(data) {
    return FavoriteStudentQuiz.create(data);
  }

  async findOne(props) {
    return FavoriteStudentQuiz.findOne({ ...props });
  }
}

export default FavoriteStudentQuizRepository;

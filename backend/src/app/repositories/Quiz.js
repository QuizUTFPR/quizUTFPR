import Quiz from '../models/QuizModel';

class QuizRepository {
  async create(quiz) {
    return Quiz.create(quiz);
  }

  async findAll(query) {
    return Quiz.findAll(query);
  }

  async findByPk(pk) {
    return Quiz.findByPk(pk);
  }
}

export default QuizRepository;

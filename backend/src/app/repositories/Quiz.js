import Quiz from '../models/QuizModel';

class QuizRepository {
  async create(quiz) {
    return Quiz.create(quiz);
  }

  async findAll(query) {
    return Quiz.findAll(query);
  }

  async findByPk(pk, props = {}) {
    return Quiz.findByPk(pk, { ...props });
  }

  async findOne(props) {
    return Quiz.findOne({ ...props });
  }

  async countQuestions(quizInstance, props = {}) {
    return quizInstance.countQuestions({ ...props });
  }
}

export default QuizRepository;

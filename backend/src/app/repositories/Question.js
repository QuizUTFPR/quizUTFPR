import Question from '../models/QuestionModel';

class QuestionRepository {
  async create(question) {
    return Question.create(question);
  }

  async findById(id) {
    return Question.findByPk(id);
  }

  async findAll(otherProps = {}) {
    return Question.findAll({
      attributes: [
        'id',
        'index',
        'title',
        'timer',
        'difficultyLevel',
        'copy',
        'availableOnQuestionsDb',
        'type',
        'score',
        'idImage',
      ],
      ...otherProps,
    });
  }
}

export default QuestionRepository;

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
        'difficulty_level',
        'copy',
        'available_on_questions_db',
        'type',
        'score',
        'image_base64',
      ],
      ...otherProps,
    });
  }
}

export default QuestionRepository;

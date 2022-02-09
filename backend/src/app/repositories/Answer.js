import Answer from '../models/AnswerModel';

class AnswerRepository {
  async create(answer) {
    return Answer.create(answer);
  }

  async findById(pk) {
    return Answer.findByPk(pk);
  }
}

export default AnswerRepository;

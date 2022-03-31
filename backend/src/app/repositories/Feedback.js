import Feedback from '../models/FeedbackModel';

class FeedbackRepository {
  async create(data) {
    return Feedback.create(data);
  }

  async findById(pk, otherProps) {
    return Feedback.findByPk(pk, { ...otherProps });
  }

  async findAll(props = {}) {
    return Feedback.findAll({ ...props });
  }

  async update(values, where) {
    return Feedback.update(values, where);
  }
}

export default FeedbackRepository;

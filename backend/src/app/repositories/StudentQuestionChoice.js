import StudentQuestionChoice from '../models/StudentQuestionChoice';

class StudentQuestionChoiceRepository {
  async create(data) {
    return StudentQuestionChoice.create(data);
  }
}

export default StudentQuestionChoiceRepository;

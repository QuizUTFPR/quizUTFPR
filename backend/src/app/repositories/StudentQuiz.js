import StudentQuiz from '../models/StudentQuiz';

class StudentQuizRepository {
  async create(data) {
    return StudentQuiz.create(data);
  }

  async findOne(props) {
    return StudentQuiz.findOne({ ...props });
  }

  async findByPk(pk, props = {}) {
    return StudentQuiz.findByPk(pk, { ...props });
  }
}

export default StudentQuizRepository;

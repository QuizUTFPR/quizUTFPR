import StudentQuiz from '../models/StudentQuiz';

class StudentQuizRepository {
  async findOne(props) {
    return StudentQuiz.findOne({ ...props });
  }
}

export default StudentQuizRepository;

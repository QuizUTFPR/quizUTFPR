import Student from '../models/StudentModel';

class StudentRepository {
  async store(student) {
    return Student.create(student);
  }
}

export default StudentRepository;

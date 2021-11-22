import Student from '../models/StudentModel';

class StudentRepository {
  async create(student) {
    return Student.create(student);
  }

  async find(where) {
    return Student.findOne(where);
  }

  async checkPass(student, password) {
    return student.checkPassword(password);
  }
}

export default StudentRepository;

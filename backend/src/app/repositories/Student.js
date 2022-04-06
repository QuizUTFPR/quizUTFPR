import Student from '../models/StudentModel';

class StudentRepository {
  async create(student) {
    return Student.create(student);
  }

  async findOne(where) {
    return Student.findOne(where);
  }

  async findAll(where) {
    return Student.findAll({ ...where });
  }

  async findByPk(pk) {
    return Student.findByPk(pk);
  }

  async checkPass(student, password) {
    return student.checkPassword(password);
  }
}

export default StudentRepository;

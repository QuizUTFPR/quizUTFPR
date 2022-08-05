import Class from '../models/ClassModel';

class ClassRepository {
  async create(data) {
    return Class.create(data);
  }

  async findById(pk, otherProps) {
    return Class.findByPk(pk, { ...otherProps });
  }

  async findByPIN(pin, otherProps) {
    return Class.findOne({
      where: {
        pin,
      },
      ...otherProps,
    });
  }

  async getAllQuizzes(classInstance, otherProps) {
    return classInstance.getClass_quizzes({ ...otherProps });
  }

  async getAllStudents(classInstance, otherProps) {
    return classInstance.getClass_students({ ...otherProps });
  }

  async getCountClassQuizzes(classInstance, otherProps) {
    return classInstance.countClass_quizzes({ ...otherProps });
  }

  async removeStudentFromClass(classInstance, student) {
    classInstance.removeClass_student(student);
  }

  async findAll(props = {}) {
    return Class.findAll({ ...props });
  }

  async update(values, where) {
    return Class.update(values, where);
  }
}

export default ClassRepository;

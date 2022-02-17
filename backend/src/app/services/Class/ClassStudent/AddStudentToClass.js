// REPOSITORIES
import ClassRepository from '../../../repositories/Class';
import StudentRepository from '../../../repositories/Student';

// import getMethod from '../../../utils/getMethodsOfAssociation';

class AddStudentToClassService {
  constructor() {
    this.classRepository = new ClassRepository();
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const { idClass, idStudent } = data;
    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const studentInstance = await this.studentRepository.findByPk(idStudent);

    if (!studentInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Aluno inexistente!';
      throw error;
    }

    classInstance.addClass_students(studentInstance);

    return classInstance;
  }
}

export default new AddStudentToClassService();

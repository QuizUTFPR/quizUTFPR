import * as Yup from 'yup';

// REPOSITORIES
import ClassRepository from '../../../repositories/Class';
import StudentRepository from '../../../repositories/Student';

class DeleteStudentFromClassService {
  constructor() {
    this.classRepository = new ClassRepository();
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idClass: Yup.string().required(),
      idStudent: Yup.number().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idClass, idStudent } = data;
    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const student = await this.studentRepository.findByPk(idStudent);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Estudante inexistente!';
      throw error;
    }

    classInstance.removeStudent(student);

    return student;
  }
}

export default new DeleteStudentFromClassService();

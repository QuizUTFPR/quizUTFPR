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
      studentId: Yup.number().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idClass, studentId } = data;

    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const student = await this.studentRepository.findByPk(studentId);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Estudante inexistente!';
      throw error;
    }

    await this.classRepository.removeStudentFromClass(classInstance, student);

    // Removing all the informations about the relation student <-> class
    await this.studentRepository.removeInformationsOfStudentAboutOneClass(
      studentId,
      idClass
    );
    return student;
  }
}

export default new DeleteStudentFromClassService();

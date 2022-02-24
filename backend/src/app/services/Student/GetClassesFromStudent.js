// REPOSITORIES
import StudentRepository from '../../repositories/Student';

class GetClassFromStudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const { idStudent } = data;

    const student = await this.studentRepository.findByPk(idStudent);

    if (!student) {
      const error = new Error();
      error.status = 404;
      error.response = 'Estudante inexistente!';
      throw error;
    }

    const classes
  }
}

export default new GetClassFromStudentService();

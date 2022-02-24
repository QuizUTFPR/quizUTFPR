import * as Yup from 'yup';

// REPOSITORIES
import StudentRepository from '../../repositories/Student';

class GetClassFromStudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idStudent: Yup.number().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idStudent } = data;

    const student = await this.studentRepository.findByPk(idStudent);

    if (!student) {
      const error = new Error();
      error.status = 404;
      error.response = 'Estudante inexistente!';
      throw error;
    }

    const classes = await student.getStudent_classes();

    if (!classes.length) {
      const error = new Error();
      error.status = 204;
      error.response = 'O aluno não está inscrito em nenhuma turma.';
      throw error;
    }

    return classes;
  }
}

export default new GetClassFromStudentService();

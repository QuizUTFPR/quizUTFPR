import * as Yup from 'yup';
import StudentRepository from '../../repositories/Student';

class CreateStudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      ra: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.response = 'Falha na validação!';
      error.status = 403;
      throw error;
    }

    const student = await this.studentRepository.create(data);

    return student;
  }
}

export default new CreateStudentService();

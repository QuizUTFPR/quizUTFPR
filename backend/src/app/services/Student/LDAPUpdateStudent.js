import * as Yup from 'yup';
import StudentRepository from '../../repositories/Student';

class LDAPUpdateStudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.response = 'Falha na validação!';
      error.status = 403;
      throw error;
    }

    const { id, name } = data;

    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      const error = new Error();
      error.status = 403;
      error.response = 'ID inválido!';
      throw error;
    }

    student.name = name;
    await student.save();

    const { email, id_image } = student;

    return {
      id,
      email,
      name,
      id_image,
    };
  }
}

export default new LDAPUpdateStudentService();

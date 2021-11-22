import * as Yup from 'yup';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import RefreshToken from '../../models/RefreshTokenModel';
import StudentRepository from '../../repositories/Student';

class CreateStudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error('Falha na validação!');
      error.status = 403;
      throw error;
    }

    const student = await this.studentRepository.store(data);
    const { id, email, name } = student;

    // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
    await RefreshToken.destroy({
      where: { user_id: id },
    });

    const token = await GenerateTokenProvider.execute(id);
    const refreshToken = await GenerateRefreshTokenProvider.execute(id);
    console.log('student id:', id);

    return {
      student: {
        email,
        name,
      },
      token,
      refresh_token: refreshToken.id,
    };
  }
}

export default CreateStudentService;

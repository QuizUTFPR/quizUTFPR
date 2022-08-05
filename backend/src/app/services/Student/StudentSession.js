import * as Yup from 'yup';
import StudentRepository from '../../repositories/Student';
import DeleteRefreshTokenService from '../RefreshToken/DeleteRefreshToken';
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';

class StudentSessionService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    // Check body of requisiton
    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { email, password } = data;

    const student = await this.studentRepository.finOne({ where: { email } });
    if (!student) {
      const error = new Error();
      error.status = 403;
      error.response = 'E-mail Inválido!';
      throw error;
    }

    if (!(await this.studentRepository.checkPass(student, password))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Senha Incorreta!';
      throw error;
    }

    const { id, name } = student;

    // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
    await DeleteRefreshTokenService.execute({
      where: { userId: id },
    });

    const token = await GenerateTokenProvider.execute(id);

    const refreshToken = await GenerateRefreshTokenProvider.execute(id);

    return {
      student: {
        name,
        email,
      },
      token,
      refreshToken: refreshToken.id,
    };
  }
}

export default new StudentSessionService();

import * as Yup from 'yup';
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import StudentRepository from '../../repositories/Student';
import DeleteRefreshTokenService from '../RefreshToken/DeleteRefreshToken';

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
      throw new Error('Falha na validação!');
    }

    const { email, password } = data;

    const student = await this.studentRepository.find({ where: { email } });
    if (!student) {
      const error = new Error('E-mail Inválido!');
      error.status = 403;
      throw error;
    }

    if (!(await this.studentRepository.checkPass(student, password))) {
      const error = new Error('Senha Incorreta!');
      error.status = 400;
      throw error;
    }

    const { id, name } = student;

    // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
    const deleteRefreshTokenService = new DeleteRefreshTokenService();
    await deleteRefreshTokenService.execute({
      where: { userId: id },
    });

    const token = await GenerateRefreshTokenProvider.execute(id);
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

export default StudentSessionService;

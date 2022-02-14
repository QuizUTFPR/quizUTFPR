import * as Yup from 'yup';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import StudentRepository from '../../repositories/Student';
import DeleteRefreshTokenService from '../RefreshToken/DeleteRefreshToken';

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
      const error = new Error();
      error.response = 'Falha na validação!';
      error.status = 403;
      throw error;
    }

    if (await this.studentRepository.find({ where: { email: data.email } })) {
      const error = new Error();
      error.status = 403;
      error.response = 'E-mail já cadastrado!';
      throw error;
    }

    const student = await this.studentRepository.create(data);
    const { id, email, name } = student;

    // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
    await DeleteRefreshTokenService.execute({
      where: { userId: id },
    });

    const token = await GenerateTokenProvider.execute(id);
    const refreshToken = await GenerateRefreshTokenProvider.execute(id);

    return {
      student: {
        email,
        name,
      },
      token,
      refreshToken: refreshToken.id,
    };
  }
}

export default new CreateStudentService();

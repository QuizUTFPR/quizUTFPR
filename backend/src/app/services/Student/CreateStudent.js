import * as Yup from 'yup';
import StudentRepository from '../../repositories/Student';
import DeleteRefreshTokenService from '../RefreshToken/DeleteRefreshToken';
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';
// import File from '../../models/FileModel';

class StudentSessionService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    console.log(777, data);

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    let student = await this.studentRepository.findOne({
      where: { email: data.email },
    });

    if (!student) {
      student = await this.studentRepository.create(data);
    }

    const { id, imageProfile, name, email } = student;

    // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
    await DeleteRefreshTokenService.execute({
      where: { userId: id },
    });

    const token = await GenerateTokenProvider.execute(id);

    const refreshToken = await GenerateRefreshTokenProvider.execute(id);

    return {
      student: {
        id,
        email,
        name,
        image: imageProfile?.url,
      },
      token,
      refreshToken: refreshToken.id,
      isFirstLogin: !name,
    };
  }
}

export default new StudentSessionService();

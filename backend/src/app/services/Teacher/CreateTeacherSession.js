// import axios from 'axios';
import * as Yup from 'yup';
// import axios from 'axios';

// PROVIDERS
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import TeacherRepository from '../../repositories/Teacher';
import RefreshTokenRepository from '../../repositories/RefreshToken';

class CreateTeacherSessionService {
  constructor() {
    this.teacherRepository = new TeacherRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  async execute(data) {
    const { email, name, picture } = data;

    const schema = Yup.object().shape({
      email: Yup.string().required(),
    });

    // Check body of requisiton
    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Falha na validação!';
      throw error;
    }

    // PROCURO SE JÁ EXISTE CADASTRO DO PROFESSOR NO BANCO
    let teacher = await this.teacherRepository.findOne({
      where: { email },
    });

    if (!teacher) {
      teacher = await this.teacherRepository.create({ email, name, picture });
    }

    const { id } = teacher;

    // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
    await this.refreshTokenRepository.delete({
      where: { userId: id },
    });

    const token = await GenerateTokenProvider.execute(id);
    const refreshToken = await GenerateRefreshTokenProvider.execute(id);

    return {
      teacher: {
        name,
        email,
        picture,
      },
      token,
      refreshToken: refreshToken.id,
    };
  }
}

export default new CreateTeacherSessionService();

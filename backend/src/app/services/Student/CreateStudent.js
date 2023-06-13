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
    const { name, email, picture, isLocalImage } = data;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      picture: Yup.string().required(),
      isLocalImage: Yup.boolean().required(),
    });
    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    let student = await this.studentRepository.findOne({
      where: { email },
    });

    if (!student) {
      const idImage = isLocalImage ? picture : null;
      const urlImage = !isLocalImage ? picture : null;

      student = await this.studentRepository.create({
        email,
        name,
        idImage,
        urlImage,
        isLocalImage,
      });
    }

    const { id } = student;

    // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
    await DeleteRefreshTokenService.execute({
      where: { userId: id },
    });

    const token = await GenerateTokenProvider.execute(id);

    const refreshToken = await GenerateRefreshTokenProvider.execute(id);

    return {
      student,
      token,
      refreshToken: refreshToken.id,
      isFirstLogin: !name,
    };
  }
}

export default new StudentSessionService();

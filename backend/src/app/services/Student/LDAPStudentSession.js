import * as Yup from 'yup';
import axios from 'axios';

import GenerateTokenProvider from '../../provider/GenerateTokenProvider';
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import DeleteRefreshTokenService from '../RefreshToken/DeleteRefreshToken';
import StudentRepository from '../../repositories/Student';
import LDAPCreateStudent from './LDAPCreateStudent';

// Models
import File from '../../models/FileModel';

class LDAPStudentSessionService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      ra: Yup.string().required(),
      password: Yup.string().required(),
    });

    // Check body of requisiton
    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { ra, password } = data;

    // OBTENDO TOKEN PARA CONSEGUIR UTILIZAR API DO LDAP

    const responseLDAP = await axios.post(`${process.env.LDAP_URL}/login`, {
      username: process.env.LDAP_USERNAME,
      password: process.env.LDAP_PASSWORD,
    });

    const { token: ldapToken } = responseLDAP.data;

    // VERIFICANDO SE DADOS ESTÃO CORRETOS DE ACORDO COM O LDAP
    const responseLoginLDAP = await axios.post(
      `${process.env.LDAP_URL}/ldap/doLogin`,
      {
        username: ra,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${ldapToken}`,
        },
      }
    );

    const { email: studentEmail } = responseLoginLDAP.data;

    let student = await this.studentRepository.findOne({
      where: { ra },
      include: [
        {
          model: File,
          as: 'imageProfile',
        },
      ],
    });

    console.log('student', student);

    if (!student) {
      student = await LDAPCreateStudent.execute({
        ra,
        email: studentEmail,
      });
    }

    const { id, email, name, id_image, imageProfile } = student;

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
        id_image,
        image: imageProfile?.url,
      },
      token,
      refreshToken: refreshToken.id,
      // isFirstLogin: !name || !id_image,
      isFirstLogin: !name,
    };
  }
}

export default new LDAPStudentSessionService();

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

    // // OBTENDO TOKEN PARA CONSEGUIR UTILIZAR API DO LDAP
    // const responseLDAP = await axios.post(`${process.env.LDAP_URL}/login`, {
    //   username: process.env.LDAP_USERNAME,
    //   password: process.env.LDAP_PASSWORD,
    // });

    // const ldapToken = responseLDAP.data.token;

    // // VERIFICANDO SE OS DADOS ESTÃO CORRETOS DE ACORDO COM O LDAP
    // const responseLoginLDAP = await axios.post(
    //   `${process.env.LDAP_URL}/ldap/doLogin`,
    //   {
    //     username,
    //     password,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${ldapToken}`,
    //     },
    //   }
    // );

    // const {
    //   email: teacherEmail,
    //   // name: teacherName,
    //   // dn: personCategory,
    // } = responseLoginLDAP.data;

    // // IMPEDIR ALUNOS DE SE CONECTAR NO 1 DE CONTROLE
    // if (process.env.NODE_ENV.toLowerCase() === 'production') {
    //   if (personCategory.indexOf('alunos') !== -1) {
    //     const error = new Error();
    //     error.status = 403;
    //     error.response = 'Painel de Controle não permitido para alunos.';
    //     throw error;
    //   }
    // }

    // PROCURO SE JÁ EXISTE CADASTRO DO PROFESSOR NO BANCO
    let teacher = await this.teacherRepository.findOne({
      where: { email },
    });

    // FORMATANDO NOME DO PROFESSOR
    // const splittedName = teacherName.split(' ');
    // const formatedName = `${splittedName[0]} ${
    //   splittedName[splittedName.length - 1]
    // }`;

    console.log('EXISTE ESSE TEACHER? ---->>>> ', teacher);
    // CASO NÃO EXISTA CRIO UMA CONTA NO BANCO PARA O MESMO
    // USADO NOS TESTES DENTRO DA REDE DA UTF

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
        // uid,
      },
      token,
      refreshToken: refreshToken.id,
    };
  }
}

export default new CreateTeacherSessionService();

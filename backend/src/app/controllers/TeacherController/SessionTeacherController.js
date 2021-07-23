import axios from 'axios';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';

// MODELS
import Teacher from '../../models/TeacherModel';

class SessionTeacherController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação!' });
      }

      console.log(process.env)

      const { username, password } = req.body;

      // OBTENDO TOKEN PARA CONSEGUIR UTILIZAR API DO LDAP
      const responseLDAP = await axios.post(`${process.env.LDAP_URL}/login`, {
        username: process.env.LDAP_USERNAME,
        password: process.env.LDAP_PASSWORD,
      });
      const ldapToken = responseLDAP.data.token;

      // VERIFICANDO SE DADOS ESTÃO CORRETOS DE ACORDO COM O LDAP
      const responseLoginLDAP = await axios.post(
        `${process.env.LDAP_URL}/ldap/doLogin`,
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${ldapToken}`,
          },
        }
      );

      const {
        email: teacherEmail,
        name: teacherName,
        // dn: personCategory,
      } = responseLoginLDAP.data;

      // IMPEDIR ALUNOS DE SE CONECTAR NO PAINEL DE CONTROLE
      // if (personCategory.indexOf('alunos'))
      //   return res
      //     .status(403)
      //     .json({ error: 'Painel de Controle não permitido para alunos.' });

      // PROCURO SE JÁ EXISTE CADASTRO DO PROFESSOR NO BANCO
      let teacher = await Teacher.findOne({
        where: { uid: username },
      });

      // FORMATANDO NOME DO PROFESSOR
      const splittedName = teacherName.split(' ');
      const formatedName = `${splittedName[0]} ${
        splittedName[splittedName.length - 1]
      }`;

      // CASO NÃO EXISTA CRIO UMA CONTA NO BANCO PARA O MESMO
      if (!teacher)
        teacher = await Teacher.create({
          uid: username,
          name: formatedName,
          email: teacherEmail,
        });

      // if (!(await teacher.checkPassword(password))) {
      //   return res.status(403).json({ error: 'Senha Incorreta!' });
      // }

      const { id, name, uid } = teacher;

      return res.json({
        teacher: {
          name,
          teacherEmail,
          uid,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expireIn,
        }),
      });
    } catch (err) {
      if (err.response.status === 401) {
        return res
          .status(403)
          .json({ error: 'Dados de usuário ou senha incorretos' });
      }
      return res.status(500).json(err);
    }
  }
}

export default new SessionTeacherController();

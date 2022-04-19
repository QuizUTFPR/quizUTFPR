// SERVICES

import LDAPStudentSessionService from '../../services/Student/LDAPStudentSession';
import LDAPUpdateStudentService from '../../services/Student/LDAPUpdateStudent';

class LDAPSessionStudentController {
  // Cadastra um único registro
  async store(req, res) {
    const { ra, password } = req.body;
    console.log('veio fazer login');
    try {
      const student = await LDAPStudentSessionService.execute({
        ra,
        password,
      });

      return res.status(200).json(student);
    } catch (error) {
      // Verificando erro de usuario ou seha do usuario pelo ldap
      if (error.response.data.status === 401) {
        const RAOrPasswordErrorLdap = new Error();
        RAOrPasswordErrorLdap.status = 403;
        RAOrPasswordErrorLdap.response = 'RA ou senha inválidos!';
        return res.status(403).json(RAOrPasswordErrorLdap);
      }

      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async update(req, res) {
    try {
      const { name, id, avatar } = req.body;

      const student = await LDAPUpdateStudentService.execute({
        name,
        id,
        avatar,
      });

      return res.status(200).json(student);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new LDAPSessionStudentController();

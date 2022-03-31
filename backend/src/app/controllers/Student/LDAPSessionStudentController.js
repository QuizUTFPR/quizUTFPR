// SERVICES

import LDAPStudentSessionService from '../../services/Student/LDAPStudentSession';
import LDAPUpdateStudentService from '../../services/Student/LDAPUpdateStudent';

class LDAPSessionStudentController {
  // Cadastra um único registro
  async store(req, res) {
    const { ra, password } = req.body;

    try {
      const student = await LDAPStudentSessionService.execute({
        ra,
        password,
      });

      return res.status(200).json(student);
    } catch (error) {
      console.log('error', error);
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
      console.log('error', error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new LDAPSessionStudentController();

import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';

// MODELS
import Student from '../../models/StudentModel';

class SessionStudentController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação!' });
      }

      const { email, password } = req.body;

      // cadastro professor caso nao existir no sistema
      const student = await Student.findOne({ where: { email } });
      if (!student) {
        return res.status(403).json({ error: 'E-mail Inválido!' });
      }

      if (!(await student.checkPassword(password))) {
        return res.status(403).json({ error: 'Senha Incorreta!' });
      }

      const { id, name } = student;

      return res.json({
        student: {
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expireIn,
        }),
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new SessionStudentController();

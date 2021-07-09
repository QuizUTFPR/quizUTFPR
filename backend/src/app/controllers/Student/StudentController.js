import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';

// MODELS
import Student from '../../models/StudentModel';

class StudentController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação!' });
      }

      const { email, password, name } = req.body;
      const student = await Student.create({
        name,
        email,
        password,
      });
      const { id } = student;

      return res.json({
        student: {
          email,
          name,
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

export default new StudentController();

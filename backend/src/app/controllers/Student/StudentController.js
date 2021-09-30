import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';

// PROVIDER
import GenerateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';


// MODELS
import Student from '../../models/StudentModel';
import RefreshToken from '../../models/RefreshTokenModel';

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

      // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
      await RefreshToken.destroy({
        where: { user_id: id },
      });

      const token = await GenerateTokenProvider.execute(id);
      const refreshToken = await GenerateRefreshTokenProvider.execute(id);


      return res.json({
        student: {
          email,
          name,
        },
        token: token,
        refresh_token: refreshToken.id
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StudentController();

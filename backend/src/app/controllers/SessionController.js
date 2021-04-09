import * as Yup from "yup";
import authConfig from '../../config/auth'
import jwt from 'jsonwebtoken'

// MODELS
import Teacher from "../models/TeacherModel";

class SessionController {
  // Cadastra um único registro
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    //Check body of requisiton
    if(!(await schema.isValid(req.body)))
      return res.status(401).json({error: 'Falha na validação!'});

    const {email, password} = req.body;


    //REQUISIÇÂO LDAP

    let teacher = await Teacher.findOne({ where: { email } });
    if (!teacher) {
      //cadastro professor
      teacher = await Teacher.create(req.body);
    }

    if (!(await teacher.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha Incorreta!' });
    }

    const { id, name } = teacher;

    return res.json({
      teacher: {
        id,
        name,
        email,
      },
      token: jwt.sign({id}, authConfig.secret, {
        expiresIn: authConfig.expireIn
      })
    });
  }
}

export default new SessionController();

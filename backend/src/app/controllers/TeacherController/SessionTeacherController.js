import * as Yup from "yup";
import authConfig from '../../../config/auth'
import jwt from 'jsonwebtoken'

// MODELS
import Teacher from "../../models/TeacherModel";

class SessionController {
  // Cadastra um único registro
  async store(req, res) {
    try{
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
      });

      //Check body of requisiton
      if(!(await schema.isValid(req.body))){
        return res.status(400).json({error: 'Falha na validação!'});
      }

      const {email, password} = req.body;


      //REQUISIÇÂO LDAP

      //cadastro professor caso nao existir no sistema
      let teacher = await Teacher.findOne({ where: { email } });
      if (!teacher) teacher = await Teacher.create(req.body);


      if (!(await teacher.checkPassword(password))){
        return res.status(403).json({ error: 'Senha Incorreta!' });
      }


      const { id, name } = teacher;

      return res.json({
        teacher: {
          name,
          email,
        },
        token: jwt.sign({id}, authConfig.secret, {
          expiresIn: authConfig.expireIn
        })
      });

    }catch(err){
      return res.status(500).json(err)
    }
    }
}

export default new SessionController();

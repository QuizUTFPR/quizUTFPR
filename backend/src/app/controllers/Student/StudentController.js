import * as Yup from "yup";
import authConfig from '../../../config/auth'
import jwt from 'jsonwebtoken'

// MODELS
import Student from "../../models/StudentModel";

class StudentController {
  // Cadastra um único registro
  async store(req, res) {
    try{
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
      });

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({error: 'Falha na validação!'});
      }

      const {email, password} = req.body;
      const student = await Student.create({ email: email, password: password });
      const { id } = student;

      return res.json({
        student: {
          id,
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

export default new StudentController();

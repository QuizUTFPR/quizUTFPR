import * as Yup from "yup";
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

    const teacher = await Teacher.findOne({ where: { email } });
    if (!teacher) {
      return res.status(401).json({ error: 'Cadastro não encontrado!' });
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
      token: "123"
    });
  }
}

export default new SessionController();

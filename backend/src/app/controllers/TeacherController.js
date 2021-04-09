import * as Yup from "yup";
import Teacher from "../models/TeacherModel";

class TeacherController {
  // Lista todos os registros
  async index() {}
  // Exibe um único registro
  async show() {}
  // Cadastra um único registro
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Falha na validação!' });


    const teacher = await Teacher.findOne({ where: { email: req.body.email } });

    if(teacher) return res.status(400).json({ error: 'Usuário já existe.' });

    const { id, name, email } = await Teacher.create(req.body);

    return res.json({ id, name, email });
  }
  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new TeacherController();

import * as Yup from "yup";
import Quiz from "../models/QuizModel";

class QuizController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .length(300)
        .required(),
      description: Yup.string().required(),
      visibility: Yup.string(10).required,
      idImage: Yup.number()
    });

    //Check body of requisiton
    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: "Falha na validação!" });

    const quiz = await Quiz.create(req.body);

    return res.json({
      quiz
    });
  }

  // Lista todos os registros
  async index() {}
  // Exibe um único registro
  async show() {}

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new QuizController();

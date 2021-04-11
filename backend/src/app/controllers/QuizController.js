import * as Yup from "yup";
import Quiz from "../models/QuizModel";

import QuestionTrueOrFalse from '../models/QuestionTrueOrFalseModel'

class QuizController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(1, "Seu título deve conter pelo menos um caracter.")
        .max(300, "Máximo de caracteres atingidos.")
        .required(),
      description: Yup.string().required(),
      visibility: Yup.string().required().max(10),
      id_image: Yup.number()
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
  async show(req, res) {

    const {id} = req.body;

    const Quiz = await Quiz.findAll({
    include: [
      {model: QuestionTrueOrFalse, as: 'questionsTrueOrFalse'}
    ],
    });


    return res.json(Quiz);

  }

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new QuizController();

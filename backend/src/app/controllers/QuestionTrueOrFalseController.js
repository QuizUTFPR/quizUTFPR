import * as Yup from "yup";
import QuestionTrueOrFalse from "../models/QuestionTrueOrFalseModel";
import QuestionTrueOrFalseQuiz from '../models/QuestionTrueOrFalseQuizModel'

class QuestionTrueOrFalseController {
  async store(req, res){
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(1, "Seu título deve conter pelo menos um caracter.")
        .max(300, "Máximo de caracteres atingidos.")
        .required(),
        correctAnswer: Yup.bool().required(),
        timer: Yup.number().required(),
        difficultyLevel: Yup.number().required(),
        quiz_id: Yup.number().required()
    });

    //Check body of requisiton
    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: "Falha na validação!" });

    const {
      id,
      title,
      correctAnswer,
      timer,
      difficultyLevel
    } = await QuestionTrueOrFalse.create(req.body);


    const questionQuiz = await QuestionTrueOrFalseQuiz.create({
      question_id: id,
      quiz_id: req.body.id_quiz
    });

    return res.json({
      title,
      correctAnswer,
      timer,
      difficultyLevel
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

export default new QuestionTrueOrFalseController();

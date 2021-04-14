import * as Yup from "yup";

// MODELS
import Question from "../models/QuestionModel";
import Answer from "../models/AnswerModel";
import Quiz from "../models/QuizModel";

class QuestionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(1, "Seu título deve conter pelo menos um caracter.")
        .max(300, "Máximo de caracteres atingidos.")
        .required(),
      timer: Yup.number().required(),
      difficultyLevel: Yup.number().required(),
      quiz_id: Yup.number().required(),
      answer: Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required(),
            is_correct: Yup.bool().required()
          })
        )
        .required(),
      tags: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
        })
      )
    });

    //Check body of requisiton
    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: "Falha na validação!" });

    const { title, timer, difficultyLevel, quiz_id, answer } = req.body;

    const quiz = await Quiz.findByPk(quiz_id);

    if (!quiz) return res.status(400).json({ error: "Quiz não encontrado!" });

    const question = await Question.create({ title, timer, difficultyLevel });

    const id_question = question.id;

    answer.map(async answerItem => {
      const answerCreated = await Answer.create({ ...answerItem, id_question });
      question.addAnswer(answerCreated);
    });

    /**
     * Quando se cria um relacionamento de N para N no Sequelize ele monta um monte de funcionalidades
     * a mais, por exemplo o 'add', que nós setamos com 'addTech()' e depois passamos o model '(tech)'
     * dentro do 'addTech(tech)' para que ele possa ter acesso e criar a tecnologia se ele não achou.
     */

    await quiz.addQuestion(question);

    return res.json(question);
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

export default new QuestionController();

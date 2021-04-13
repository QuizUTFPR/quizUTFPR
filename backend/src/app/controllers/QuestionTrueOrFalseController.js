import * as Yup from "yup";

import Question from '../models/QuestionModel'
import QuestionTrueOrFalse from "../models/QuestionTrueOrFalseModel";
import Quiz from '../models/QuizModel'

function getAllMethods(obj) {
    var result = [];
    for (var id in obj) {
      try {
        if (typeof(obj[id]) == "function") {
          result.push(id + ": " + obj[id].toString());
        }
        } catch (err) {
          result.push(id + ": inaccessible");
        }
      }
    return result;
  }

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

    const {title, correctAnswer, timer, difficultyLevel, quiz_id} = req.body;

    const quiz = await Quiz.findByPk(quiz_id);

    if(!quiz) return res.status(400).json({error: 'Quiz não encontrado!'})


    const question = await Question.create({title, timer, difficultyLevel});

    const id_question =  question.id;


    const questionTrueOrFalse = await QuestionTrueOrFalse.create({
      id_question,
      correctAnswer 
    });


    // await questionTrueOrFalse.setQuestion(question);
    /**
    * Quando se cria um relacionamento de N para N no Sequelize ele monta um monte de funcionalidades
    * a mais, por exemplo o 'add', que nós setamos com 'addTech()' e depois passamos o model '(tech)'
    * dentro do 'addTech(tech)' para que ele possa ter acesso e criar a tecnologia se ele não achou.
    */

    await quiz.addQuestion(question)

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

export default new QuestionTrueOrFalseController();

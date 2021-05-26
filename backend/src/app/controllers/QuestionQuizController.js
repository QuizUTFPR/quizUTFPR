import * as Yup from "yup";

// MODELS
import Quiz from "../models/QuizModel";
import Teacher from "../models/TeacherModel";
import Question from "../models/QuestionModel";
import Answer from "../models/AnswerModel";
import Tag from "../models/TagModel";

import getMethod from '../utils/getMethodsOfAssociation'

class QuestionQuizController {
  // Lista todos os registros
  async index(req, res) {
    try{
      const {id} = req.params;

      const quiz = await Quiz.findByPk(id);

      const questionOfQuiz = await quiz.getQuestions({
        attributes: ['id', 'title', 'timer', 'difficultyLevel'],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ["title", "is_correct"]
          },
          {
            model: Tag,
            as: "tags_question",
            attributes: ["name"],
            through: {
              attributes: []
            }
          }
        ]
      });

      if(!questionOfQuiz.length)
      return res.status(400).json({error: "Não existe nenhum quiz cadastrado."});


      return res.status(200).json(questionOfQuiz);
    }catch(err){
      return res.status(500).json(err);
    }
  }
  // Exibe um único registro
  async show(req, res) {
  }

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new QuestionQuizController();

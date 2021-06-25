import * as Yup from "yup";
import Sequelize from "sequelize"
// const { fn, col } = require("sequelize");

// MODELS
import Quiz from "../../models/QuizModel";
import Teacher from "../../models/TeacherModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';
import Student from '../../models/StudentModel'
import Question from '../../models/QuestionModel'
import StudentQuiz from "../../models/StudentQuiz";
import StudentQuestionChoice from "../../models/StudentQuestionChoice";


import getMethod from '../../utils/getMethodsOfAssociation';

class PINQuizController {
  // Lista todos os registros
  async index(req, res) {
    try{
      const {pin} = req.body;
      const student_id = req.userId;
      
      const quiz = await Quiz.findOne({
        where: {
          pin
        },
        include: [
          {
            model: Teacher,
            as: "teacher",
            attributes: ["name", "email"]
          },
          {
            model: File,
            as: "image_quiz",
            attributes: ["url","path", "name"]       
          },
          {
            model: Tag,
            as: "tags_quiz",
            attributes: ["name"],
            through: {
              attributes: []
              }
          },
          ],
      });

      const questionAmount = await quiz.countQuestions();
      const studentChoicesAmount = await quiz.countQuiz_student_choice({
        where: {
          student_id,
          quiz_id: quiz.id
        }
      });
      console.log()


    return res.status(200).json({quiz, questionAmount, studentChoicesAmount});
    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new PINQuizController();

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

class StudentQuizInProgressController {
  // Lista todos os registros
  async index(req, res) {
    try{
      const student_id = req.userId;

      const student = await Student.findByPk(student_id);
      if(!student)
        return res.status(404).json({error: "Aluno não encontrado!"});
      
      let QuizzesInProgress = await student.getStudent_quiz({
        where: {
          is_finished: false
        },
        include: [{
          model: Quiz,
          as: "quiz",
          attributes: ["id","title", "description"],
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
        }]
      });

      const studentQuizInProgress = await Promise.all(QuizzesInProgress.map(async (item) => {
        const questionAmount = await item.quiz.countQuestions();
        const studentChoicesAmount = (await item.countQuiz_question_choice());

        return {
          studentChoicesAmount,
          questionAmount,
          quiz: item.quiz
        }
      }))


    return res.status(200).json(studentQuizInProgress);
    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizInProgressController();

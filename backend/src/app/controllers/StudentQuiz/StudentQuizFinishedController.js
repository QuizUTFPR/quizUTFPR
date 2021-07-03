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

class StudentQuizFinishedController {
  // Lista todos os registros
  async index(req, res) {
    try{
      
      const student_id = req.userId;
      
      const QuizzesFinished = await Quiz.findAll({
        where: {published: true},
        attributes: [
          'id', 'title', 'description', 'pin'
        ],
        include: [
          {
            model: StudentQuiz, as: 'quiz_student',
            required: true,
            where: {
              student_id
            }
          },
          {
            model: Teacher, as: 'teacher',
            attributes: ['id', 'name', 'email']
          }
        ]
      })


    return res.status(200).json(QuizzesFinished);
    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizFinishedController();

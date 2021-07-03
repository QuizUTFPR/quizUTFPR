import * as Yup from "yup";
const {col} = require("sequelize")

// MODELS
import Quiz from "../../models/QuizModel";
import Teacher from "../../models/TeacherModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';
import Question from '../../models/QuestionModel'
import Answer from '../../models/AnswerModel'
import Student from '../../models/StudentModel'

import StudentQuiz from "../../models/StudentQuiz";
import StudentQuestionChoice from "../../models/StudentQuestionChoice";


import getMethod from '../../utils/getMethodsOfAssociation';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try{
      const {quiz_id} = req.body;
          
      const quiz = await Quiz.findByPk(quiz_id, {
        attributes: ['id', 'title', 'description', 'visibility', 'id_image', 'pin']
      });

      if(!quiz) 
        return res.status(404).json({
          error: "Quiz não encontrado!"
        });

      
      const questions = await quiz.getQuestions({     
        joinTableAttributes: [],
        include: [{
          model: Answer, as: 'answer',
          attributes: ['id', 'title', 'is_correct'],
        }],
        attributes: ['id', 'title', 'index', 'timer', 'score', 'difficulty_level', 'type'],
        order: [['index', 'ASC'], [
          {
            model: Answer, as: 'answer'
          }, 'id', 'ASC'
        ]]
      });


      if(!questions) 
        return res.status(404).json({
          error: "Quiz não possui questões cadastradas!"
        });


      //  GETTING ALL THE STUDENT THAT ANSWERED THE QUIZ
      const studentQuizAttempt = await quiz.getQuiz_student({
        where: {
          is_finished: true
        },
        attributes: ['student_id', 'quiz_id'],
        group: ["student_id"],
      });
      
      
      
      const studentQuiz = await Promise.all(
        studentQuizAttempt.map(async (choice) => {
          const student = await choice.getStudent({
            attributes: ['id', 'name', 'email'],
            include: [
              {
                model: StudentQuiz, as: 'student_quiz',
                where: {
                  quiz_id,
                  is_finished: true
                },
                attributes: ['id', 'score', 'student_id'],
                include: [{
                  model: StudentQuestionChoice, as: 'quiz_question_choice',
                  attributes: ['id', 'time_left', 'question_id', 'checked1', 'checked2', 'checked3','checked4']
                }]
              }
            ],
            order: [[
                {model: StudentQuiz, as: 'student_quiz'},
                'score', 'DESC'
              ],
              [
                {model: StudentQuiz, as: 'student_quiz',},
                {model: StudentQuestionChoice, as: 'quiz_question_choice'}, 
                'id', 'ASC'
              ]],
            });

          return {
            ...student.dataValues,
            student_quiz: student.student_quiz[0]

          }
        }));
                      

      return res.status(200).json({questions, studentQuiz});
    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new StatisticsQuizController();

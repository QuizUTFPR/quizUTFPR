import * as Yup from "yup";
// import * as Sequelize from 'sequelize';
const { fn, col, literal } = require("sequelize");

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
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct'],
          }],
          attributes: ['id', 'title', 'index', 'timer', 'score', 'difficulty_level', 'type'],
          order: [['index', 'ASC']]
         });


        if(!questions) 
          return res.status(404).json({
            error: "Quiz não possui questões cadastradas!"
          });


        //  GETTING THE HIGHEST SCORE FROM EACH STUDENT

          const studentQuizAttempt = await quiz.getQuiz_student({
            where: {
              is_finished: true
            },
            attributes: ['id', 'student_id', 'quiz_id'],
            group: ["student_id"],
          });
      

        //  GETTING THE ATTEMPT FROM EACH STUDENT CONSIDERING THE HIGHEST SCORE
         const formatedStudentQuizAttempt = await Promise.all(
           studentQuizAttempt.map(async (choice, index) => {

             const student = await choice.getStudent({
               attributes: ['id', 'name', 'email'],
               include: [
                 {
                   model: StudentQuiz,
                   as: 'student_quiz',
                   where: {
                     quiz_id,
                     is_finished: true
                   },
                   attributes: ['id', 'hit_amount', 'score']
                  }
                ],
                order: [[
                  {
                    model: StudentQuiz,
                    as: 'student_quiz',
                  }, 'score', 'DESC'
                ]],
             });

             return {
              ...student.dataValues, 
              student_quiz: {
                ...student.student_quiz[0].dataValues,
                choices: await student.student_quiz[0].getQuiz_question_choice({
                  attributes: ['id', 'student_quiz_id','question_id', 'time_left', 'checked1', 'checked2', 'checked3', 'checked4']

                })
              }
              }
           }));
    
        
        // const student_choices = formatedStudentQuizAttempt.map(async item => await item.student_quiz.getQuiz_question_choice());

       const returnedValue = {
        //  avgTotalTimeAnswering: SumTotalTimeAnswering/formatedStudentQuizAttempt.length,
         questions,
         formatedStudentQuizAttempt
       }

      


    return res.status(200).json(returnedValue);

    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new StatisticsQuizController();

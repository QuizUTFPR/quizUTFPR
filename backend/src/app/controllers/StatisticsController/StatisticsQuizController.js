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


      //  GETTING THE STUDENT WHO ANSWERED THE QUIZ
      const studentQuizAttempt = await quiz.getQuiz_student({
        where: {
          is_finished: true
        },
        attributes: ['id', 'student_id', 'quiz_id'],
        group: ["student_id"],
      });
      

      //  GETTING THE ATTEMPT FROM EACH STUDENT CONSIDERING THE HIGHEST SCORE
      const formatedStudentQuizAttempt = await Promise.all(
        studentQuizAttempt.map(async (choice) => {
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
              student_quiz: student.student_quiz[0]
          }
        }));
              
        //GETTING THE ID_STUDENT_QUIZ OF THE BEST TRY OF EACH STUDENT
        const ArrayOfIDAboutBestScoreAttemptQuiz = formatedStudentQuizAttempt.map(item => item.student_quiz.id);

        // INCLUDING IN THE QUESTION ALL THE CHOICES OF THE STUDENT
        // WE ONLY CONSIDER THE CHOICE ABOUT THE BEST SCORE
        const newQuestions = await Promise.all(questions.map(async item => {
          console.log(getMethod(item));
          const question_choice = await item.getQuestion_choice({
            where: {
              student_quiz_id: ArrayOfIDAboutBestScoreAttemptQuiz
            },
            attributes: ['student_quiz_id', 'student_id','time_left', 'checked1', 'checked2', 'checked3', 'checked4'],
            include: [
              {
                model: Student,
                as: 'student',
                attributes: ['name', 'email']
              }
            ]
            
          });
          
          return {
            ...item.dataValues, 
            question_choice
          };
        }))
    
        

      const returnedValue = {
        // ArrayOfIDAboutBestScoreAttemptQuiz,
        newQuestions,
        attemptsOfTheHighestScore: formatedStudentQuizAttempt
      }

      return res.status(200).json(returnedValue);
    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new StatisticsQuizController();

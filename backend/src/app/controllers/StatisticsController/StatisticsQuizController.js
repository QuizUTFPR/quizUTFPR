import * as Yup from "yup";
// import * as Sequelize from 'sequelize';
const { fn, col, literal } = require("sequelize");

// MODELS
import Quiz from "../../models/QuizModel";
import Teacher from "../../models/TeacherModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';
import Question from '../../models/QuestionModel'


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
        attributes: ['id', 'index','title', 'id_image', 'timer', 'score', 'type', 'difficulty_level'],
        joinTableAttributes: [],
        order: [['index', 'ASC']]
      });

      // await Promise.all(questions.map(async item =>  console.log( await item.countQuestion_choice())));

      if(!questions) 
        return res.status(404).json({
          error: "Quiz não possui questões cadastradas!"
        });



      //GETTING THE HIGHEST SCORE FROM EACH STUDENT
      let studentQuizAttempt = [];
      (await quiz.getQuiz_student({
        where: {
          is_finished: true
        },
        attributes: ['id', 'student_id', 'quiz_id', 'hit_amount', 'score'],
        order: [['student_id', 'ASC']]
      })).map(item => {
        const attempt = studentQuizAttempt[item.student_id];
        if(!attempt){
          studentQuizAttempt[item.student_id] = item;
        }else{
          if(attempt.score < item.score){
            studentQuizAttempt[item.student_id] = item;
          }
        }
      });

      let SumTotalTimeAnswering = 0;

      // GETTING THE CHOICES FROM EACH STUDENT
      const studentQuizAttemptWithoutNull = studentQuizAttempt.filter(Boolean)
      const formatedStudentQuizAttempt = await Promise.all((studentQuizAttemptWithoutNull.filter(Boolean))
        .map(async (choice, index) => {
          const student = await choice.getStudent({
            attributes: ['name', 'email']
          });
          const student_choice = (await choice.getQuiz_question_choice({
            attributes: ['question_id', 'time_left', 'checked1', 'checked2', 'checked3', 'checked4']
          })).map(item => {
            SumTotalTimeAnswering += questions[index].timer - item.time_left;
            return item;
          });

          return {
            ...choice.dataValues,
            student,
            student_choice
          }
        }));
    
    
      

      const returnedValue = {
        avgTotalTimeAnswering: SumTotalTimeAnswering/formatedStudentQuizAttempt.length,
        questions,
        formatedStudentQuizAttempt
      }

      


    return res.status(200).json({returnedValue });

    }catch(err){
      console.log(err)
      return res.status(500).json(err);
    }
  }
}

export default new StatisticsQuizController();

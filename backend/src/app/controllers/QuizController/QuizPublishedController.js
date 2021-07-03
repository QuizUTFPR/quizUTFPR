import * as Yup from "yup";

// MODELS
import Student from "../../models/StudentModel";
import Quiz from "../../models/QuizModel";
import Teacher from "../../models/TeacherModel";
import Question from "../../models/QuestionModel";
import Answer from "../../models/AnswerModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';


import getMethod from '../../utils/getMethodsOfAssociation';

class QuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try{
      const student_id = req.userId;

      const quizzes = await Quiz.findAll({
        where: {  
          published: true, 
          visibility: 'public' 
        },
        attributes: ["id", "title", "description", "visibility", "id_image", "pin"],
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
          }
        ]
      });

      
      const quizzesInProgress = (await (await Student.findByPk(student_id)).getStudent_quiz({
        where: {
          is_finished: false
        }
      })).map(item => item.quiz_id);
      
      const returnedQuizzes = quizzes.filter(quiz => !quizzesInProgress.includes(quiz.id) )
      
      // if(!quizzes.length)
      //   return res.status(404).json({error: "Não existe nenhum quiz cadastrado."});


      return res.status(200).json(returnedQuizzes);
    }catch(err){
      return res.status(500).json(err);
    }
  }
}

export default new QuizPublishedController();

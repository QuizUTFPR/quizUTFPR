import * as Yup from "yup";
const { col } = require("sequelize");

// MODELS
import Quiz from "../../models/QuizModel";
import Teacher from "../../models/TeacherModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';
import StudentQuiz from "../../models/StudentQuiz";
import StudentQuestionChoice from "../../models/StudentQuestionChoice";


// import getMethod from '../../utils/getMethodsOfAssociation';

class StudentQuizInProgressController {
  // Lista todos os registros
  async index(req, res) {
    try{
      const student_id = req.userId;
      console.log(student_id)
      const quizzes = await Quiz.findAll({
        where: {  published: true },
        attributes: ["id", "title", "description", "visibility", "id_image"],
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

      console.log(quizzes)

      if(!quizzes.length)
        return res.status(404).json({error: "Não existe nenhum quiz cadastrado."});


      return res.status(200).json(quizzes);
    }catch(err){
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizInProgressController();

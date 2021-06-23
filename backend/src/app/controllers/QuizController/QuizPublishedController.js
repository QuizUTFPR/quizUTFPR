import * as Yup from "yup";

// MODELS
import Quiz from "../../models/QuizModel";
import Teacher from "../../models/TeacherModel";
import Question from "../../models/QuestionModel";
import Answer from "../../models/AnswerModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';


// import getMethod from '../../utils/getMethodsOfAssociation';

class QuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try{
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

      if(!quizzes.length)
        return res.status(404).json({error: "Não existe nenhum quiz cadastrado."});


      return res.status(200).json(quizzes);
    }catch(err){
      return res.status(500).json(err);
    }
  }
  // Exibe um único registro
  async show(req, res) {
    try{
      const {tag} = req.params;

      const quiz = await Quiz.findAll({
        attributes: ["id", "title", "description", "visibility", "id_image"],
        include: [
          {
            model: Teacher,
            as: "teacher",
            attributes: ["name", "email"]
          },
          {
            model: Question,
            as: "questions",
            attributes: ['id','index', 'title', 'timer', 'difficulty_level', 'copy', 'available_on_questions_db', 'type'],
            through: {
              attributes: []
            },
            include: [
              {
                model: Answer,
                as: "answer",
                attributes: ["title", "is_correct"]
              },{
                model: Tag,
                as: "tags_question",
                attributes: ["name"],
                through: {
                  attributes: []
                }
              }
            ]
          },
          {
            model: Tag,
            as: "tags_quiz",
            attributes: ["name"],
            where: {
              name: tag
            },
            through: {
              attributes: []
            }
          }
        ],
        order: [[{model: Answer, as: 'answer'}, 'id', 'ASC']],
      });

      if(!quiz.length) 
        return res.status(404).json({error: "Não existe nenhum quiz com a tag informada."});

      return res.status(200).json(quiz);
    }catch(err){
      return res.status(500).json(err);
    }
  }
}

export default new QuizPublishedController();

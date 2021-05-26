import * as Yup from "yup";

// MODELS
import Quiz from "../models/QuizModel";
import Teacher from "../models/TeacherModel";
import Question from "../models/QuestionModel";
import Answer from "../models/AnswerModel";
import Tag from "../models/TagModel";
import File from '../models/FileModel';

class QuizController {
  async store(req, res) {
    try{
      const schema = Yup.object().shape({
        title: Yup.string()
          .min(1, "Seu título deve conter pelo menos um caracter.")
          .max(300, "Máximo de caracteres atingidos.")
          .required(),
        description: Yup.string().required(),
        visibility: Yup.string()
          .required()
          .max(10),
        id_image: Yup.number(),
        tags: Yup.array().required("Informe as tags do quiz!")
      });

      //Check body of requisiton
      if (!(await schema.isValid(req.body)))
        return res.status(401).json({ error: "Falha na validação!" });

      const id_teacher = req.userId;

      const quiz = await Quiz.create({ ...req.body, id_teacher });
      console.log("passado",req.body);
      console.log("quiz",quiz);
      const { tags } = req.body;

      tags.map(async tagObject => {
        //tag =  TAG FOUND OR CREATE
        //Created = flag to inform if some tag was created
        const [tag, Created] = await Tag.findOrCreate({
          where: {
            name: tagObject
          }
        });

        tag.addQuiz(quiz);
      });

    

      return res.status(200).json({
        quiz
      });
    }catch(err){
      return res.status(500).json(err);
    }
  }

  // Lista todos os registros
  async index(req, res) {
    try{
      const quizzes = await Quiz.findAll({
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
          //{
            //model: Question,
            //as: "questions",
            //attributes: ["id", "title", "timer", "difficultyLevel"],
            //through: {
             // attributes: []
            //},
            //include: [
             // {
               // model: Answer,
            //    as: "answer",
             //   attributes: ["title", "is_correct"]
            //  },{
             //   model: Tag,
             //   as: "tags_question",
              //  attributes: ["name"],
              //  through: {
               //   attributes: []
              //  }
              //}
            //]
          //},
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
      return res.status(204).json({error: "Não existe nenhum quiz cadastrado."});


      return res.status(200).json(quizzes);
    }catch(err){
      console.log(err)
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
            attributes: ["id", "title", "timer", "difficultyLevel"],
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
        ]
      });

      if(!quiz.length) return res.status(204).json({error: "Não existe nenhum quiz com a tag informada."});

      return res.status(200).json(quiz);
    }catch(err){
      return res.status(500).json(err);
    }
  }

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new QuizController();

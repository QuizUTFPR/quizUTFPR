import * as Yup from "yup";
import Quiz from "../models/QuizModel";

import Teacher from '../models/TeacherModel'
import Question from '../models/QuestionModel'
import QuestionTrueOrFalse from '../models/QuestionTrueOrFalseModel'

import Tag from '../models/TagModel'

function getAllMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
      } catch (err) {
        result.push(id + ": inaccessible");
      }
    }
  return result;
}

class QuizController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(1, "Seu título deve conter pelo menos um caracter.")
        .max(300, "Máximo de caracteres atingidos.")
        .required(),
      description: Yup.string().required(),
      visibility: Yup.string().required().max(10),
      id_image: Yup.number(),
      tags: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
        })
      ).required('Informe as tags do quiz!')
    });

    //Check body of requisiton
    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: "Falha na validação!" });

    const id_teacher = req.userId;
    const quiz = await Quiz.create({...req.body, id_teacher});

    const {tags} = req.body;

    tags.map(async (tagObject) => {

      //tag =  TAG FOUND OR CREATE
      //Created = flag to inform if some tag was created
      const [tag, Created] = await Tag.findOrCreate({
        where: {
          name: tagObject.name
        }
      });

      tag.addQuiz(quiz);
    });

    return res.json({
      quiz
    });
  }

  // Lista todos os registros
  async index() {}
  // Exibe um único registro
  async show(req, res) {

    const {id} = req.body;

    const quiz = await Quiz.findAll({
    attributes: ['id','title', 'description', 'visibility', 'id_image'],
    include: [
      {
        model: Teacher,
        as: 'teacher',
        attributes: ['name', 'email']
      },
      {
        model: Question,
        as: 'questions',
        include: ['answer'],
        attributes: ['title', 'timer', 'difficultyLevel'],
        through: {
          attributes: []
        }
      },
      {
        model: Tag,
        as: 'tags',
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    ],
    });



    return res.json(quiz);

  }

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new QuizController();

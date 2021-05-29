import * as Yup from "yup";

// MODELS
import Question from "../models/QuestionModel";
import Answer from "../models/AnswerModel";
import Quiz from "../models/QuizModel";
import Tag from "../models/TagModel";


class QuestionController {
  async store(req, res) {
    try{
      const schema = Yup.object().shape({
        id: yup.number().required(),
        copy: yup.boolean().required(),
        availableOnQuestionsDB: yup.boolean().required(),
        title: Yup.string()
          .min(1, "Seu título deve conter pelo menos um caracter.")
          .max(300, "Máximo de caracteres atingidos.")
          .required(),
        timer: Yup.number().required(),
        difficultyLevel: Yup.number().required(),
        quiz_id: Yup.number().required(),
        tags: yup.array().of(yup.string()).required("Informe as tags da questão!"),
        id_image: Yup.number(),
        answer: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required(),
              is_correct: Yup.bool().required()
            })
          ).required("Informe as alternativas.")
      });

      //Check body of requisiton
      if (!(await schema.isValid(req.body)))
        return res.status(401).json({ error: "Falha na validação!" });

      const {
        id,
        copy,
        availableOnQuestionsDB,
        title, 
        timer, 
        difficultyLevel, 
        quiz_id, 
        answer,
        tags,
        id_image,
      } = req.body;

      const quiz = await Quiz.findByPk(quiz_id);

      if (!quiz) return res.status(204).json({ error: "Quiz não encontrado!" });

      const question = await Question.findOrCreate({ 
        defaults: {
          title: title, 
          timer: timer, 
          difficulty_level: difficultyLevel,
          copy: copy,
          available_on_questions_db: availableOnQuestionsDB,
          id_image: id_image
        },
        where: {
          id: id
        }});

      const id_question = question.id;

      answer.map(async answerItem => {
        const answerCreated = await Answer.create({ ...answerItem, id_question });
        question.addAnswer(answerCreated);
      });

      /**
       * Quando se cria um relacionamento de N para N no Sequelize ele monta um monte de funcionalidades
       * a mais, por exemplo o 'add', que nós setamos com 'addTech()' e depois passamos o model '(tech)'
       * dentro do 'addTech(tech)' para que ele possa ter acesso e criar a tecnologia se ele não achou.
       */

      await quiz.addQuestion(question);


      tags.map(async tagObject => {
        //tag =  TAG FOUND OR CREATE
        //Created = flag to inform if some tag was created
        const [tag, Created] = await Tag.findOrCreate({
          where: {
            name: tagObject.name
          }
        });

        tag.addQuestion(question);
      });

      return res.status(200).json(question);
    }catch(err){
      return res.status(500).json(err);
    }
  }

  // Lista todos os registros
  async index(req, res) {
    try{
      const questions = await Question.findAll({
        attributes: ['id', 'title', 'timer', 'difficultyLevel'],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct']
          },
          {
            model: Tag,
            as: 'tags_question',
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        ]
      });

      if(!questions.length) return res.status(204).json({error: "Não existe nenhuma questão cadastrada."});

      return res.status(200).json(questions);

    }catch(err){
      return res.status(500).json(err);
    }
  }

  // Exibe um único registro
  async show(req, res) {
    try{
      const {tag} = req.params;

      const questions = await Question.findAll({
        attributes: ['id', 'title', 'timer', 'difficultyLevel'],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct']
          },
          {
            model: Tag,
            as: 'tags_question',
            where: {
              name: tag
            },
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        ]
      });

      if(!questions.length)
        return res.status(204).json({error: "Não existe nenhuma questão cadastrada."});

      return res.status(200).json(questions);

    }catch(err){
      return res.status(500).json(err);
    }
  }

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete() {}
}

export default new QuestionController();

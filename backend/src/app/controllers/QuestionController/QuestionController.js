import * as Yup from "yup";

// MODELS
import Question from "../../models/QuestionModel";
import Answer from "../../models/AnswerModel";
import Quiz from "../../models/QuizModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';

async function getScoreBasedOnDifficulty(difficulty){
  switch (difficulty) {
    case 'Muito Fácil':
      return 5;
    case 'Fácil':
      return 10;
    case 'Médio':
      return 15;
    case 'Difícil':
      return 30;
    case 'Muito Difícil':
      return 40;
    default:
      return 0;

  }
}

class QuestionController {
  async store(req, res) {
    try{
      const schema = Yup.object().shape({
        quiz_id: Yup.number().required(),
        index: Yup.number().required(),
        id: Yup.number().required(),
        copy: Yup.boolean().required(),
        availableOnQuestionsDB: Yup.boolean().required(),
        title: Yup.string()
          .min(1, "Seu título deve conter pelo menos um caracter.")
          .max(300, "Máximo de caracteres atingidos.")
          .required(),
        timer: Yup.number().required(),
        difficultyLevel: Yup.string().required(),
        quiz_id: Yup.number().required(),
        tags: Yup.array().of(Yup.string()).required("Informe as tags da questão!"),
        id_image: Yup.number().nullable(),
        type: Yup.string().required("Informe o tipo da questão"),
        answer: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.number().required(),
              title: Yup.string().required(),
              is_correct: Yup.bool().required()
            })
          ).required("Informe as alternativas.")
      });

      //Check body of requisiton
      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ error: "Falha na validação!" });

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
        type,
        id_image,
        index
      } = req.body;

      const quiz = await Quiz.findByPk(quiz_id);
      if (!quiz) return res.status(404).json({ error: "Quiz não encontrado!" });

      let question = await Question.findByPk(id);
      const score = await getScoreBasedOnDifficulty(difficultyLevel);

      if(!question){
        //CASO QUESTÃO NÃO EXISTIR CRIO A MESMA E AS ALTERNATIVAS
        try {
          question = await Question.create({
            copy: copy,
            available_on_questions_db: availableOnQuestionsDB,
            title: title, 
            timer: timer, 
            difficulty_level: difficultyLevel, 
            quiz_id: quiz_id, 
            id_image: id_image,
            type: type,
            index: index,
            score
          }) 

        } catch (error) {
          return res.status(500).json(error);
        }
      }else{
        // CASO QUESTÃO JÁ EXISTA REALIZO AS ALTERAÇÕES AQUI
        question.title = title;
        question.index = index;
        question.timer = timer;
        question.difficulty_level = difficultyLevel;
        question.copy = copy;
        question.type = type;
        question.score = score;
        question.available_on_questions_db = availableOnQuestionsDB;
        if(id_image)  question.id_image = id_image;
        question.save();
      }

      // ATUALIZANDO OU CRIANDO AS QUESTÕES
      const id_question = question.id;

      answer.map(async answerItem => {
        const answerFounded = await Answer.findByPk(answerItem.id);
        if(!answerFounded){
          try{
            await Answer.create({
              id_question: id_question,
              title: answerItem.title, 
              is_correct: answerItem.is_correct
            });
          }catch(err){
            return res.status(500).json(error);
          }
        }else{
          answerFounded.title = answerItem.title;
          answerFounded.is_correct = answerItem.is_correct;
          answerFounded.save();
        }
      });

      const idAnswerReceived = answer.map(item => item.id);
      const AnswerAlreadyInQuestion = await question.getAnswer();

      AnswerAlreadyInQuestion.map(answer => {
        if(!idAnswerReceived.find(elementID => elementID == answer.id)){
          answer.destroy();
        }
      })
      


      await quiz.addQuestion(question);
      // ATUALIZANDO TAG DAS QUESTÕES
      const tagsAlreadyInQuestion = await question.getTags_question();
      const arrayTagsAlreadyInQuestion = tagsAlreadyInQuestion.map(item => item.name);
      
      tags.map(async tagObject => {
        const [tag, Created] = await Tag.findOrCreate({
          where: {
            name: tagObject
          }
        });
        if(!arrayTagsAlreadyInQuestion.find(element => element == tag)){
          tag.addQuestion(question);
        }
      });

      //REMOVENDO TAGS QUE FORAM RETIRADAS DA QUESTÃO
      tagsAlreadyInQuestion.map(tagInQuestion => {
        if(!tags.find(element => element == tagInQuestion.name)){
          tagInQuestion.removeQuestion(question);
        }
      })


      return res.status(200).json(question);
    }catch(err){
      return res.status(500).json(err);
    }
  }

  // Lista todos os registros
  async index(req, res) {
    try{
      const questions = await Question.findAll({
        attributes: ['id','index', 'title', 'timer', 'difficulty_level', 'copy', 'available_on_questions_db', 'type', 'score'],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct'],
          },
          {
            model: File,
            as: "image_question",
            attributes: ["url","path", "name"]       
          },
          {
            model: Tag,
            as: 'tags_question',
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        ],
        order: [[{model: Answer, as: 'answer'}, 'id', 'ASC']],
      });

      if(!questions.length) return res.status(404).json({error: "Não existe nenhuma questão cadastrada."});

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
        where: {
          available_on_questions_db: true,
        },
        attributes: ['id', 'title', 'timer', 'difficulty_level', 'type', 'score'],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct'],
          },
          {
            model: File,
            as: "image_question",
            attributes: ["url","path", "name"]       
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
        ],
        order: [[{model: Answer, as: 'answer'}, 'id', 'ASC']],
      });

      if(!questions.length)
        return res.status(404).json({error: "Não existe nenhuma questão cadastrada."});

      return res.status(200).json(questions);

    }catch(err){
      return res.status(500).json(err);
    }
  }

  // Altera um único registro
  update() {}
  // Remove um único registro
  async delete(req, res) {
    try {
      const {id} = req.body;

      const question = await Question.findByPk(id);
      
      if(!question)
        return res.status(404).json({error: "Questão não encontrada!"})

      const {id_image} = question; 

      const file = await File.findByPk(id_image);

      if(file) file.destroy();

      const answers = await question.getAnswer();
      const tags = await question.getTags_question();


      answers.map(item => item.destroy());
      tags.map(item =>  question.removeTags_question(item));
      question.destroy();

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json(err);
    }
  }
}

export default new QuestionController();

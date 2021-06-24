import * as Yup from "yup";

// MODELS
import Quiz from "../../models/QuizModel";
import Answer from "../../models/AnswerModel";
import Tag from "../../models/TagModel";
import File from '../../models/FileModel';
import StudentQuiz from "../../models/StudentQuiz";
import StudentQuestionChoice from "../../models/StudentQuestionChoice";



class QuestionQuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try{
      const student_id = req.userId;
      const {id} = req.params;
      const quiz = await Quiz.findByPk(id);

      if(!quiz)
        return res.status(404).json({error: "Quiz não encontrado!"})

      const questionOfQuiz = await quiz.getQuestions({
        attributes: ['id','index', 'title', 'timer', 'difficulty_level', 'type'],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ["id","title"],
          },
          {
            model: File,
            as: "image_question",
            attributes: ["url","path", "name"]       
          },
          {
            model: Tag,
            as: "tags_question",
            attributes: ["name"],
            through: {
              attributes: []
            }
          }
        ],
        order: [['index', 'ASC'],[{model: Answer, as: 'answer'}, 'id', 'ASC']],
      });

      // const attempt = await StudentQuiz.count({
      //   where: { student_id, quiz_id: id }
      // });

      // const AllQuestionFromAttempt = (await StudentQuestionChoice.findAll({
      //   where: {
      //     student_id, quiz_id: id, attempt
      //   },
      //   attributes: ['question_id']
      // })).map(item => item.question_id)

      
      // const returnedQuestions = questionOfQuiz.map(question => {
      //   if(AllQuestionFromAttempt.indexOf(question.id)) return question;
      // }).filter(Boolean)


      if(!questionOfQuiz.length)
      return res.status(404).json({error: "Não existe nenhuma questão cadastrada para este quiz."});


      return res.status(200).json(questionOfQuiz);
    }catch(err){
      return res.status(500).json(err);
    }
  }
}

export default new QuestionQuizPublishedController();

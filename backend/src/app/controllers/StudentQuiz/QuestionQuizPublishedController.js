// MODELS
import Quiz from '../../models/QuizModel';
import Answer from '../../models/AnswerModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';
import StudentQuiz from '../../models/StudentQuiz';

class QuestionQuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const student_id = req.userId;
      const { quiz_id, id_student_quiz } = req.body;

      const quiz = await Quiz.findByPk(quiz_id);

      if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado!' });

      const studentQuiz = await StudentQuiz.findOne({
        where: {
          id: id_student_quiz,
          is_finished: false,
        },
      });

      if (!studentQuiz)
        return res.status(404).json({ error: 'Tentativa não encontrada!' });

      const studentQuizChoices = await studentQuiz.getQuiz_question_choice();
      const arrayIDStudentQuizChoices = studentQuizChoices.map(
        (item) => item.question_id
      );

      const questionOfQuiz = await quiz.getQuestions({
        attributes: [
          'id',
          'index',
          'title',
          'timer',
          'difficulty_level',
          'type',
        ],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title'],
          },
          {
            model: File,
            as: 'image_question',
            attributes: ['url', 'path', 'name'],
          },
          {
            model: Tag,
            as: 'tags_question',
            attributes: ['name'],
            through: {
              attributes: [],
            },
          },
        ],
        order: [
          ['index', 'ASC'],
          [{ model: Answer, as: 'answer' }, 'id', 'ASC'],
        ],
      });

      const amountOfQuestion = await quiz.countQuestions();
      const amountStudentChoice = await quiz.countQuiz_student_choice({
        where: {
          quiz_id: quiz.id,
          student_quiz_id: id_student_quiz,
          student_id,
        },
      });

      const returnedQuestion = questionOfQuiz.filter(
        (question) => !arrayIDStudentQuizChoices.includes(question.id)
      );

      // if(!questionOfQuiz.length)
      // return res.status(404).json({error: "Não existe nenhuma questão cadastrada para este quiz."});

      return res.status(200).json({
        amountOfQuestion,
        amountStudentChoice,
        questions: returnedQuestion,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new QuestionQuizPublishedController();

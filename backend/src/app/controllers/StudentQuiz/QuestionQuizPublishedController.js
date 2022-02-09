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
      const studentId = req.userId;
      const { quizId, idStudentQuiz } = req.body;

      const quiz = await Quiz.findByPk(quizId);

      if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado!' });

      const studentQuiz = await StudentQuiz.findOne({
        where: {
          id: idStudentQuiz,
          isFinished: false,
        },
      });

      if (!studentQuiz)
        return res.status(404).json({ error: 'Tentativa não encontrada!' });

      const studentQuizChoices = await studentQuiz.getQuizQuestionChoice();
      const arrayIDStudentQuizChoices = studentQuizChoices.map(
        (item) => item.questionId
      );

      const questionOfQuiz = await quiz.getQuestions({
        attributes: [
          'id',
          'index',
          'title',
          'timer',
          'difficultyLevel',
          'type',
          'idImage',
        ],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title'],
          },
          {
            model: File,
            as: 'imageQuestion',
            attributes: ['url', 'path', 'name'],
          },
          {
            model: Tag,
            as: 'tagsQuestion',
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
      const amountStudentChoice = await quiz.countQuizStudentChoice({
        where: {
          quizId: quiz.id,
          studentQuizId: idStudentQuiz,
          studentId,
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

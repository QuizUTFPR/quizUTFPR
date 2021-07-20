// MODELS
import Quiz from '../../models/QuizModel';
import Answer from '../../models/AnswerModel';
import Tag from '../../models/TagModel';
// import File from '../../models/FileModel';

class QuestionQuizController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const { id } = req.params;

      const quiz = await Quiz.findByPk(id);

      if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado!' });

      const questionOfQuiz = await quiz.getQuestions({
        attributes: [
          'id',
          'index',
          'title',
          'timer',
          'difficulty_level',
          'score',
          'copy',
          'available_on_questions_db',
          'type',
          'image_base64',
        ],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct'],
          },
          // {
          //   model: File,
          //   as: 'image_question',
          //   attributes: ['url', 'path', 'name'],
          // },
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

      if (!questionOfQuiz.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhum quiz cadastrado.' });

      return res.status(200).json(questionOfQuiz);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new QuestionQuizController();

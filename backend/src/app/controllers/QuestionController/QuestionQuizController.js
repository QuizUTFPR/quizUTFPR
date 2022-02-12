// SERVICES
import QuestionsOfQuizService from '../../services/Question/QuestionsOfQuiz';

class QuestionQuizController {
  // Lista todos os registros
  // async index(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const quiz = await Quiz.findByPk(id);
  //     if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado!' });
  //     const questionOfQuiz = await quiz.getQuestions({
  //       attributes: [
  //         'id',
  //         'index',
  //         'title',
  //         'timer',
  //         'difficultyLevel',
  //         'score',
  //         'copy',
  //         'availableOnQuestionsDb',
  //         'type',
  //         'idImage',
  //       ],
  //       include: [
  //         {
  //           model: Answer,
  //           as: 'answer',
  //           attributes: ['id', 'title', 'isCorrect'],
  //         },
  //         {
  //           model: File,
  //           as: 'imageQuestion',
  //           attributes: ['url', 'path', 'name'],
  //         },
  //         {
  //           model: Tag,
  //           as: 'tagsQuestion',
  //           attributes: ['name'],
  //           through: {
  //             attributes: [],
  //           },
  //         },
  //       ],
  //       order: [
  //         ['index', 'ASC'],
  //         [{ model: Answer, as: 'answer' }, 'id', 'ASC'],
  //       ],
  //     });
  //     if (!questionOfQuiz.length)
  //       return res
  //         .status(204)
  //         .json({ error: 'Não existe nenhuma questão cadastrada.' });
  //     return res.status(200).json(questionOfQuiz);
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // }

  async index(req, res) {
    try {
      const { id } = req.params;
      const questionsOfQuiz = await QuestionsOfQuizService.index({ id });

      return res.status(200).json(questionsOfQuiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuestionQuizController();

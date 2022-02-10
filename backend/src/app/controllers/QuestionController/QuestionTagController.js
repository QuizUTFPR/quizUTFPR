// MODELS
import Tag from '../../models/TagModel';
import Question from '../../models/QuestionModel';
import Answer from '../../models/AnswerModel';
import File from '../../models/FileModel';

class QuestionTagController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const aimedTagQuestions = req.body;

      const questions = await Question.findAll({
        where: {
          availableOnQuestionsDb: true,
        },
        attributes: [
          'id',
          'title',
          'timer',
          'difficultyLevel',
          'score',
          'type',
          'idImage',
        ],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'isCorrect'],
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
            require: true,
            through: {
              attributes: [],
            },
          },
        ],
        order: [[{ model: Answer, as: 'answer' }, 'id', 'ASC']],
      });

      const filteredQuestionByTag = await Promise.all(
        // eslint-disable-next-line consistent-return
        questions.map(async (item) => {
          const questionTags = (await item.getTagsQuestion()).map(
            (element) => element.name
          );
          const intersection = questionTags.filter((element) =>
            aimedTagQuestions.includes(element)
          );
          if (intersection.length === aimedTagQuestions.length) {
            return item;
          }
        })
      );

      const filteredQuestionByTagWithoutUndefined =
        filteredQuestionByTag.filter(Boolean);

      if (!filteredQuestionByTagWithoutUndefined.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhuma questão cadastrada.' });

      return res.status(200).json(filteredQuestionByTagWithoutUndefined);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new QuestionTagController();

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
          available_on_questions_db: true,
        },
        attributes: [
          'id',
          'title',
          'timer',
          'difficulty_level',
          'score',
          'type',
        ],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct'],
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
            require: true,
            through: {
              attributes: [],
            },
          },
        ],
        order: [[{ model: Answer, as: 'answer' }, 'id', 'ASC']],
      });

      const filteredQuestionByTag = await Promise.all(
        questions.map(async (item) => {
          const questionTags = (await item.getTags_question()).map(
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

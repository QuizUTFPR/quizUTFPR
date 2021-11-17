import crc32 from 'fast-crc32c';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';

// MODELS
import Quiz from '../../models/QuizModel';

dayjs.extend(utc);
// dayjs.extend(timezone);

class PublishQuizController {
  // Lista todos os registros
  async update(req, res) {
    try {
      const { id } = req.body;
      const pin = crc32.calculate(toString(id), id);
      const quiz = await Quiz.findByPk(id);

      if (!quiz)
        return res.status(404).json({ error: 'Nenhum quiz encontrado.' });

      const countQuestion = await quiz.countQuestions();
      if (countQuestion < 1)
        return res
          .status(404)
          .json({ error: 'Nenhuma questão cadastrada no quiz.' });


      quiz.published = true;
      quiz.pin = pin;
      quiz.publish_date = dayjs.utc().format();
      quiz.save();

      return res.status(200).json();
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new PublishQuizController();

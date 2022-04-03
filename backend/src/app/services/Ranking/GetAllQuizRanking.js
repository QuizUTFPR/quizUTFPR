import * as Yup from 'yup';

// REPOSITORIES
import RankingRepository from '../../repositories/Ranking';

// MODELS
import StudentModel from '../../models/StudentModel';
import FileModel from '../../models/FileModel';
import StudentQuiz from '../../models/StudentQuiz';

class GetAllQuizRanking {
  constructor() {
    this.rankingRepository = new RankingRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      quizId: Yup.string('Tipo de ID do quiz inválido.').required(
        'Por favor, informe o ID do quiz.'
      ),
    });

    const validation = await schema.validate(data);

    if (!validation) {
      const error = new Error();
      error.status = 400;
      error.response = validation;
      throw error;
    }

    const { quizId } = data;

    const quizRanking = await this.rankingRepository.findAll({
      where: { quizId },
      include: [
        {
          model: StudentQuiz,
          as: 'rankStudentQuiz',
          attributes: ['hitAmount', 'score'],
        },
        {
          model: StudentModel,
          as: 'rankStudent',
          attributes: ['id', 'name'],
          include: [
            {
              model: FileModel,
              as: 'imageProfile',
              attributes: ['url', 'path'],
            },
          ],
        },
      ],
      order: [
        [
          {
            model: StudentQuiz,
            as: 'rankStudentQuiz',
          },
          'score',
          'DESC',
        ],
      ],
    });

    if (quizRanking.length === 0) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhuma tentativa encontrada!';
      throw error;
    }

    return quizRanking;
  }
}

export default new GetAllQuizRanking();

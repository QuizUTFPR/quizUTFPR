import * as Yup from 'yup';

// REPOSITORIES
import RankingRepository from '../../repositories/Ranking';

// MODELS
import StudentQuiz from '../../models/StudentQuiz';

class CreateOrUpdateStudentQuizRanking {
  constructor() {
    this.rankingRepository = new RankingRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      studentId: Yup.string('Tipo de ID do estudante inválido.').required(
        'Por favor, informe o ID do estudante.'
      ),
      quizId: Yup.string('Tipo de ID do quiz inválido.').required(
        'Por favor, informe o ID do quiz.'
      ),
      newStudentQuizId: Yup.number(
        'Tipo de ID do studentQuiz inválido.'
      ).required('Por favor, informe o ID do studentQuiz da nova tentativa.'),
      newScore: Yup.number('Tipo number não válido para newScore').required(
        'Por favor, informe o novo score a ser comparado.'
      ),
      classId: Yup.string('Tipo do ID da turma inválido').nullable(),
    });

    const validation = await schema.validate(data);

    if (!validation) {
      const error = new Error();
      error.status = 400;
      error.response = validation;
      throw error;
    }

    const { studentId, quizId, newStudentQuizId, newScore, classId } = data;

    let ranking;

    ranking = await this.rankingRepository.findOne({
      where: {
        studentId,
        quizId,
      },
      include: [
        {
          model: StudentQuiz,
          as: 'rankStudentQuiz',
          where: {
            classId: classId || null,
          },
        },
      ],
    });

    // If student has already one instance of ranking about this quiz,
    // we check if the new one is greater than the older one
    if (ranking) {
      const { rankStudentQuiz: olderRankStudentQuiz } = ranking;

      if (olderRankStudentQuiz.score < newScore) {
        ranking.studentQuizId = newStudentQuizId;
      }

      await ranking.save();
    } else {
      ranking = await this.rankingRepository.create({
        studentId,
        quizId,
        studentQuizId: newStudentQuizId,
      });
    }

    return ranking;
  }
}

export default new CreateOrUpdateStudentQuizRanking();

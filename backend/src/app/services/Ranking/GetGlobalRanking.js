// REPOSITORIES
import StudentRepository from '../../repositories/Student';

// MODELS
import FileModel from '../../models/FileModel';
import StudentQuiz from '../../models/StudentQuiz';
import RankingModel from '../../models/RankingModel';

class GetAllQuizRanking {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute() {
    const studentQuizList = await this.studentRepository.findAll({
      attributes: ['id', 'name', 'ra'],
      include: [
        {
          model: FileModel,
          as: 'imageProfile',
          attributes: ['url', 'path'],
        },
        {
          model: RankingModel,
          as: 'studentRank',
          attributes: ['id', 'quizId'],
          include: [
            {
              model: StudentQuiz,
              as: 'rankStudentQuiz',
              attributes: [
                ['hit_amount', 'score'],
                ['score', 'oldWayToCalculeteScore'],
              ],
            },
          ],
        },
      ],
      order: [
        [
          {
            model: RankingModel,
            as: 'studentRank',
          },
          {
            model: StudentQuiz,
            as: 'rankStudentQuiz',
          },
          'score',
          'DESC',
        ],
      ],
    });

    const globalRanking = await Promise.all(
      studentQuizList.map(async (item) => {
        const { studentRank, id, name, ra, imageProfile } = item.dataValues;
        const bestAttemptOfEachQuiz = {};

        studentRank.forEach((rankItem) => {
          const { quizId, rankStudentQuiz } = rankItem;

          if (bestAttemptOfEachQuiz[quizId] === undefined) {
            bestAttemptOfEachQuiz[quizId] = rankStudentQuiz.dataValues;
          }
        });

        const totalScore = Object.values(bestAttemptOfEachQuiz).reduce(
          (actualValue, obj) => actualValue + obj.score,
          0
        );

        return {
          studentId: id,
          rankStudent: {
            name,
            ra,
            imageProfile,
          },
          rankStudentQuiz: {
            score: totalScore,
          },
        };
      })
    );

    if (globalRanking.length === 0) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhuma tentativa encontrada!';
      throw error;
    }

    return globalRanking.sort(
      (a, b) => b.rankStudentQuiz.score - a.rankStudentQuiz.score
    );
  }
}

export default new GetAllQuizRanking();

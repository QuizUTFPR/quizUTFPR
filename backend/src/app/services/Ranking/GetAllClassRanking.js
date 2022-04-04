import * as Yup from 'yup';
import { Op } from 'sequelize';

// REPOSITORIES
import RankingRepository from '../../repositories/Ranking';
import ClassRepository from '../../repositories/Class';

// MODELS
import FileModel from '../../models/FileModel';
import StudentQuiz from '../../models/StudentQuiz';
import RankingModel from '../../models/RankingModel';

// import GetMethod from '../../utils/getMethodsOfAssociation';

class GetAllClassRanking {
  constructor() {
    this.rankingRepository = new RankingRepository();
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      classId: Yup.string('Tipo de ID da turma inválido.').required(
        'Por favor, informe o ID da turma.'
      ),
    });

    const validation = await schema.validate(data);

    if (!validation) {
      const error = new Error();
      error.status = 400;
      error.response = validation;
      throw error;
    }

    const { classId } = data;

    const classInstance = await this.classRepository.findById(classId);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma não encontrada!';
      throw error;
    }

    const classQuizzesListOfId = (await classInstance.getClass_quizzes()).map(
      (item) => item.id
    );

    if (!classQuizzesListOfId) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhum quiz cadastrado na turma!';
      throw error;
    }

    const classStudentList = await classInstance.getClass_students({
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
          where: {
            quizId: {
              [Op.in]: classQuizzesListOfId,
            },
          },
          attributes: ['id'],
          include: [
            {
              where: {
                classId,
              },
              model: StudentQuiz,
              as: 'rankStudentQuiz',
              attributes: ['hitAmount', 'score'],
            },
          ],
        },
      ],
    });

    if (classStudentList.length === 0) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhuma tentativa encontrada!';
      throw error;
    }

    const returnedClassRanking = await Promise.all(
      classStudentList.map(async (props) => {
        const {
          id,
          name,
          ra,
          imageProfile,
          studentRank,
          student_class: _,
        } = props.dataValues;
        let totalScore = 0;

        studentRank.forEach((instance) => {
          const { rankStudentQuiz } = instance;
          const { score } = rankStudentQuiz;
          totalScore += score;
        });

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

    return returnedClassRanking;
  }
}

export default new GetAllClassRanking();

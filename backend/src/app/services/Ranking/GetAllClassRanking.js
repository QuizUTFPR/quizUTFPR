import * as Yup from 'yup';
import { Op } from 'sequelize';

// REPOSITORIES
import RankingRepository from '../../repositories/Ranking';
import ClassRepository from '../../repositories/Class';

// MODELS
import StudentModel from '../../models/StudentModel';
import FileModel from '../../models/FileModel';
import StudentQuiz from '../../models/StudentQuiz';

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

    const classStudentsListOfId = (await classInstance.getClass_students()).map(
      (item) => item.id
    );

    if (!classStudentsListOfId) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhum estudante inscrito na turma!';
      throw error;
    }

    const classRanking = await this.rankingRepository.findAll({
      attributes: ['studentId', 'quizId', 'studentQuizId'],
      where: {
        quizId: {
          [Op.in]: classQuizzesListOfId,
        },
        student_id: {
          [Op.in]: classStudentsListOfId,
        },
      },
      include: [
        {
          where: {
            classId: classId || null, // PEGA SOMENTE OS RANKING DA TURMA INFORMADA
          },
          model: StudentQuiz,
          as: 'rankStudentQuiz',
          attributes: ['hitAmount', 'score'],
        },
        {
          model: StudentModel,
          as: 'rankStudent',
          attributes: ['name'],
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

    if (classRanking.length === 0) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhuma tentativa encontrada!';
      throw error;
    }

    return classRanking;
  }
}

export default new GetAllClassRanking();

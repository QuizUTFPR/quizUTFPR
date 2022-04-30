import * as Yup from 'yup';

// REPOSITORIES
import ClassRepository from '../../../repositories/Class';
import FavoriteStudentQuizRepository from '../../../repositories/FavoriteStudentQuiz';

// MODELS
import File from '../../../models/FileModel';

class GetAllQuizzesFromClassService {
  constructor() {
    this.classRepository = new ClassRepository();
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idClass: Yup.string().required(),
      idStudent: Yup.number().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idClass, idStudent } = data;
    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const quizzes = await classInstance.getClass_quizzes({
      include: [
        {
          model: File,
          as: 'image',
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const verifyingFavoriteQuizzes = await Promise.all(
      quizzes.map(async (quiz) => {
        const isFavorite = await this.favoriteStudentQuizRepository.findOne({
          where: {
            quizId: quiz.id,
            studentId: idStudent,
          },
        });

        return {
          ...quiz.dataValues,
          isFavorite: !!isFavorite,
        };
      })
    );

    console.log('verifyingFavoriteQuizzes', verifyingFavoriteQuizzes);

    return verifyingFavoriteQuizzes;
  }
}

export default new GetAllQuizzesFromClassService();

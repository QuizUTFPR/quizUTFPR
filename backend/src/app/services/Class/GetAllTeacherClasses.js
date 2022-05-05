import ClassRepository from '../../repositories/Class';

// MODELS
import File from '../../models/FileModel';

class GetAllTeacherClasses {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const { idTeacher, quizId } = data;

    const classes = await this.classRepository.findAll({
      where: {
        idTeacher,
      },
      include: [
        {
          model: File,
          as: 'imageClass',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!classes.length) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não existe nenhum turma cadastrado.';
      throw error;
    }

    const returnedClasses = {
      public: [],
      private: [],
    };

    await Promise.all(
      classes.map(async (item) => {
        const { visibility } = item;

        let countQuizzes;

        if (quizId) {
          countQuizzes = await this.classRepository.getCountClassQuizzes(item, {
            where: {
              id: quizId,
            },
          });

          if (countQuizzes > 0) returnedClasses[visibility].push(item);
        } else {
          returnedClasses[visibility].push(item);
        }
      })
    );

    return returnedClasses;
  }
}

export default new GetAllTeacherClasses();

import ClassRepository from '../../repositories/Class';

// MODELS
import File from '../../models/FileModel';

class GetAllTeacherClasses {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const { idTeacher } = data;

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
      error.response = 'Não existe nenhuma turma cadastrada.';
      throw error;
    }

    const returnedClasses = {
      public: [],
      private: [],
    };

    classes.forEach((item) => {
      const { visibility } = item;

      returnedClasses[visibility].push(item);
    });

    return returnedClasses;
  }
}

export default new GetAllTeacherClasses();

import * as Yup from 'yup';
import ClassRepository from '../../repositories/Class';

// Models
import File from '../../models/FileModel';

class FindByPkClass {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { id } = data;

    const classInstance = await this.classRepository.findById(id, {
      attributes: ['id', 'pin', 'title', 'description'],
      include: [
        {
          model: File,
          as: 'imageClass',
          attributes: ['path', 'url'],
        },
      ],
    });

    const attachedQuizzes = await classInstance.countClass_quizzes();
    const studentsSubscribed = await classInstance.countClass_students();

    return { ...classInstance.dataValues, attachedQuizzes, studentsSubscribed };
  }
}

export default new FindByPkClass();

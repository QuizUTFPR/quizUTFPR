import * as Yup from 'yup';
import crc32 from 'fast-crc32c';

// Repositories
import ClassRepository from '../../repositories/Class';

class CreateCloneClass {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idClass: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      idTeacher: Yup.number().required(),
      idImage: Yup.number(),
      visibility: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idClass, title, idTeacher, description, idImage, visibility } =
      data;

    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const quizzes = await this.classRepository.getAllQuizzes(classInstance);

    const myNewClass = await this.classRepository.create({
      title,
      idTeacher,
      description,
      idImage,
      visibility,
    });

    const { id } = myNewClass;
    const pin = crc32.calculate(toString(id), new Date().getTime());

    await this.classRepository.update(
      {
        pin,
      },
      {
        where: { id },
      }
    );

    // Associando quizzes de uma turma no clone
    await Promise.all(
      quizzes.map(async (quiz) => {
        const { id: idQuiz } = quiz;
        return myNewClass.addClass_quiz(idQuiz);
      })
    );

    return {
      ...myNewClass.dataValues,
      pin,
    };
  }
}

export default new CreateCloneClass();

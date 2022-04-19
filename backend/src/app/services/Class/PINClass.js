import * as Yup from 'yup';

// MODELS
import File from '../../models/FileModel';
import Teacher from '../../models/TeacherModel';

// REPOSITORIES
import ClassRepository from '../../repositories/Class';

class PINClassService {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async findByPin(data) {
    const schema = Yup.object().shape({
      pin: Yup.string().required(),
      studentId: Yup.number().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { pin, studentId } = data;

    const classInstance = await this.classRepository.findByPIN(pin, {
      include: [
        {
          model: File,
          as: 'imageClass',
          attributes: ['url', 'path', 'name'],
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'PIN inválido!';
      throw error;
    }

    const amountOfQuizzes = await classInstance.countClass_quizzes();
    const students = await classInstance.getClass_students();

    const isStudentSubscribed = students.some(
      (studentInstance) => studentInstance.id === studentId
    );

    return {
      ...classInstance.dataValues,
      subscribed: isStudentSubscribed,
      amountOfQuizzes,
    };
  }
}

export default new PINClassService();

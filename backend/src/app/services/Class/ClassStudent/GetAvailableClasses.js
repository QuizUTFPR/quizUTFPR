import { Op } from 'sequelize';
import * as Yup from 'yup';

// MODELS
import File from '../../../models/FileModel';

// REPOSITORIES
import ClassRepository from '../../../repositories/Class';
import StudentRepository from '../../../repositories/Student';

class GetAvailableClassesService {
  constructor() {
    this.classRepository = new ClassRepository();
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { studentId } = data;
    const student = await this.studentRepository.findByPk(studentId);

    const studentClasses = await student.getStudent_classes();

    const idStudentClasses = studentClasses.map(
      (studentClass) => studentClass.id
    );

    const availableClasses = await this.classRepository.findAll({
      where: {
        id: {
          [Op.notIn]: idStudentClasses,
        },
      },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['url', 'path'],
        },
      ],
    });

    if (!availableClasses.length) {
      const error = new Error();
      error.status = 204;
      error.response = 'Não há turmas além das que o aluno já está inscrito!';
      throw error;
    }

    return availableClasses;
  }
}

export default new GetAvailableClassesService();

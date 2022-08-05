import * as Yup from 'yup';

// REPOSITORIES
import ClassRepository from '../../../repositories/Class';
import File from '../../../models/FileModel';

class GetAllStudentsFromClassService {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idClass: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { idClass } = data;
    const classInstance = await this.classRepository.findById(idClass);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Turma inexistente!';
      throw error;
    }

    const students = await this.classRepository.getAllStudents(classInstance, {
      attributes: ['id', 'name', 'ra', 'email'],
      include: [
        {
          model: File,
          as: 'imageProfile',
          attributes: ['url', 'path'],
        },
      ],
    });

    return students;
  }
}

export default new GetAllStudentsFromClassService();

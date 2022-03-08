import Yup from 'yup';

// MODELS
import File from '../../../models/FileModel';
import Teacher from '../../../models/TeacherModel';

// REPOSITORIES
import StudentRepository from '../../../repositories/Student';

class GetAllStudentClasses {
  constructor() {
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

    if (!student) {
      const error = new Error();
      error.status = 204;
      error.response = 'Aluno inexistente';
      throw error;
    }

    const studentClasses = await this.student.getStudent_Classes({
      include: [
        {
          model: File,
          as: 'imageClass',
          attributes: ['url', 'path'],
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!studentClasses.length) {
      const error = new Error();
      error.status = 204;
      error.response = 'O Aluno não está inscrito em turma alguma';
      throw error;
    }

    return studentClasses;
  }
}

export default new GetAllStudentClasses();

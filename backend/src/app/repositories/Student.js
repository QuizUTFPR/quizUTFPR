import Student from '../models/StudentModel';
import StudentQuizRepository from './StudentQuiz';

class StudentRepository {
  async create(student) {
    return Student.create(student);
  }

  async findOne(where) {
    return Student.findOne(where);
  }

  async findAll(where) {
    return Student.findAll({ ...where });
  }

  async findByPk(pk) {
    return Student.findByPk(pk);
  }

  async checkPass(student, password) {
    return student.checkPassword(password);
  }

  async removeInformationsOfStudentAboutOneClass(studentId, classId) {
    const studentQuizRepository = new StudentQuizRepository();

    const studentQuizRecords = await studentQuizRepository.findAll({
      where: {
        studentId,
        classId,
      },
    });

    if (studentQuizRecords.length === 0) return;

    await Promise.all(studentQuizRecords.map((item) => item.destroy()));
  }
}

export default StudentRepository;

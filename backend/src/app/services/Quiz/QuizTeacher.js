// MODELS
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

class QuizTeacherService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async execute(data) {
    const quizzes = await this.quizRepository.findAll({
      where: {
        idTeacher: data,
      },
      attributes: [
        'id',
        'title',
        'description',
        'visibility',
        'idImage',
        'published',
        'pin',
        'noTime',
      ],
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['name', 'email'],
        },
        {
          model: Tag,
          as: 'tagsQuiz',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
        {
          model: File,
          as: 'image',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    if (!quizzes.length) {
      const error = new Error('Não existe nenhum quiz cadastrado.');
      error.status = 404;
      throw error;
    }

    return quizzes;
  }
}

export default QuizTeacherService;

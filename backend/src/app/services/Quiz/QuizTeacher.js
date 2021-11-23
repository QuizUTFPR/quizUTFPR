// MODELS
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

class QuizTeacherService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async execute(data) {
    const quizzes = await this.quizRepository.findAll({
      where: {
        id_teacher: data,
      },
      attributes: [
        'id',
        'title',
        'description',
        'visibility',
        'id_image',
        'published',
        'pin',
        'image_base64',
        'no_time',
      ],
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['name', 'email'],
        },
        {
          model: Tag,
          as: 'tags_quiz',
          attributes: ['name'],
          through: {
            attributes: [],
          },
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

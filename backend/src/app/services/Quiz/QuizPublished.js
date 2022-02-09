// MODELS
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import StudentRepository from '../../repositories/Student';

class QuizPublishedService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const { student_id } = data;
    const page = data.page || false;
    const limit = data.limit || 3;

    console.log('ID:', student_id);

    const quizzes = await this.quizRepository.findAll({
      where: {
        published: true,
        visibility: 'public',
      },
      attributes: [
        'id',
        'title',
        'description',
        'visibility',
        'id_image',
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
          model: File,
          as: 'image_quiz',
          attributes: ['url', 'path', 'name'],
        },
        {
          model: Tag,
          as: 'tagsQuiz',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
      offset: page ? (page - 1) * limit : 0,
      limit: page ? limit : null,
    });

    const quizzesInProgress = (
      await (
        await this.studentRepository.findByPk(student_id)
      ).getStudent_quiz({
        where: {
          is_finished: false,
        },
      })
    ).map((item) => item.quiz_id);
    console.log(quizzesInProgress);

    const returnedQuizzes = quizzes.filter(
      (quiz) => !quizzesInProgress.includes(quiz.id)
    );

    const verifyingFavoriteQuizzes = await Promise.all(
      returnedQuizzes.map(async (quiz) => {
        const isFavorite = await FavoriteStudentQuiz.findOne({
          where: {
            quiz_id: quiz.id,
            student_id,
          },
        });

        return {
          ...quiz.dataValues,
          isFavorite: !!isFavorite,
        };
      })
    );

    return verifyingFavoriteQuizzes;
  }
}

export default QuizPublishedService;

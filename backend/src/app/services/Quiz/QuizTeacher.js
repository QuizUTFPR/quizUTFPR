// MODELS
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

import getMethodsOfAssociation from '../../utils/getMethodsOfAssociation';

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
        'idTeacher',
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
      order: [['createdAt', 'DESC']],
    });

    if (!quizzes.length) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não existe nenhum quiz cadastrado.';
      throw error;
    }

    const returnedQuizzes = {};

    await Promise.all(
      // eslint-disable-next-line consistent-return
      quizzes.map(async (item) => {
        const { visibility } = item;
        const itemQuiz = {
          ...item.dataValues,
          amountOfQuestions: await this.quizRepository.countQuestions(item),
        };

        if (!returnedQuizzes[visibility]) {
          returnedQuizzes[visibility] = [itemQuiz];
        } else {
          return returnedQuizzes[visibility].push(itemQuiz);
        }
      })
    );

    return returnedQuizzes;
  }
}

export default new QuizTeacherService();

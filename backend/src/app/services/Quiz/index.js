import * as Yup from 'yup';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import FileRepository from '../../repositories/File';
import TagRepository from '../../repositories/Tag';

class QuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.fileRepository = new FileRepository();
    this.tagRepository = new TagRepository();
  }

  async validate(data) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(1, 'Seu título deve conter pelo menos um caracter.')
        .max(300, 'Máximo de caracteres atingidos.')
        .required(),
      description: Yup.string().required(),
      visibility: Yup.string().required().max(10),
      tags: Yup.array().required('Informe as tags do quiz!'),
      noTime: Yup.bool().required(),
      idImage: Yup.number(),
    });

    const isValid = await schema.isValid(data);

    return isValid;
  }

  async create(data) {
    // Check requisiton body
    if (!(await this.validate(data))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Falha na validação!';
      throw error;
    }

    const quiz = await this.quizRepository.create(data);

    const { tags: propsTags } = data;

    const tags = [
      ...new Set(propsTags.map((element) => element.toLowerCase().trim())),
    ];

    tags.map(async (tagObject) => {
      const [tag] = await this.tagRepository.findOrCreate({
        where: {
          name: tagObject,
        },
      });

      tag.addQuiz(quiz);
    });

    return quiz;
  }

  async index(query) {
    const quizzes = this.quizRepository.index(query);

    if (!quizzes.length) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não existe nenhum quiz cadastrado.';
      throw error;
    }

    return quizzes;
  }

  async findByPk(pk) {
    await this.quizRepository.findByPk(pk);
  }

  async update(data) {
    // Check body of requisiton
    if (!(await this.validate(data))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Falha na validação!';
      throw error;
    }

    const {
      id,
      tags: propsTags,
      title,
      description,
      visibility,
      idImage,
      noTime,
    } = data;

    const tags = [
      ...new Set(propsTags.map((element) => element.toLowerCase().trim())),
    ];

    const quiz = await this.quizRepository.findByPk(id);
    quiz.title = title;
    quiz.description = description;
    quiz.visibility = visibility;
    quiz.noTime = noTime;

    // Image
    let oldImageId = false;

    if (idImage) {
      oldImageId = quiz.idImage;
      quiz.idImage = idImage;
    } else {
      quiz.idImage = null;
    }

    await quiz.save();
    if (oldImageId) {
      const image = await this.fileRepository.findByPk(oldImageId);
      await image.destroy();
    }

    const tagsAlreadyInQuiz = await quiz.getTagsQuiz();
    const arrayTagsAlreadyInQuiz = tagsAlreadyInQuiz.map((item) => item.name);

    tags.map(async (tagObject) => {
      const [tag] = await this.tagRepository.findOrCreate({
        where: {
          name: tagObject,
        },
      });

      if (!arrayTagsAlreadyInQuiz.find((element) => element === tag)) {
        tag.addQuiz(quiz);
      }
    });

    // eslint-disable-next-line array-callback-return
    tagsAlreadyInQuiz.map((tagInQuiz) => {
      if (!tags.find((element) => element === tagInQuiz.name)) {
        tagInQuiz.removeQuiz(quiz);
      }
    });

    return quiz;
  }

  async delete(data) {
    const quiz = await this.quizRepository.findByPk(data);

    if (!quiz) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não existe nenhum quiz com o ID informado.';
      throw error;
    }

    await quiz.destroy();
  }
}

export default new QuizService();

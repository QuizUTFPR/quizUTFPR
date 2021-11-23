import * as Yup from 'yup';

// MODELS
import Tag from '../../models/TagModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

class QuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async validate(data) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(1, 'Seu título deve conter pelo menos um caracter.')
        .max(300, 'Máximo de caracteres atingidos.')
        .required(),
      description: Yup.string().required(),
      visibility: Yup.string().required().max(10),
      id_image: Yup.number(),
      tags: Yup.array().required('Informe as tags do quiz!'),
      imageBase64: Yup.string(),
      noTime: Yup.bool().required(),
    });

    const isValid = await schema.isValid(data);

    return isValid;
  }

  async create(data) {
    // Check requisiton body
    if (!(await this.validate(data))) {
      const error = new Error('Falha na validação!');
      error.status = 400;
      throw error;
    }

    const quiz = await this.quizRepository.create(data);

    const { tags } = data;

    tags.map(async (tagObject) => {
      const [tag] = await Tag.findOrCreate({
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
      const error = new Error('Não existe nenhum quiz cadastrado.');
      error.status = 404;
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
      const error = new Error('Falha na validação!');
      error.status = 400;
      throw error;
    }

    const { id, tags, title, description, visibility, imageBase64, noTime } =
      data;

    const quiz = await this.quizRepository.findByPk(id);
    quiz.title = title;
    quiz.description = description;
    quiz.visibility = visibility;
    quiz.image_base64 = imageBase64;
    quiz.no_time = noTime;
    quiz.save();

    const tagsAlreadyInQuiz = await quiz.getTags_quiz();
    const arrayTagsAlreadyInQuiz = tagsAlreadyInQuiz.map((item) => item.name);

    tags.map(async (tagObject) => {
      const [tag] = await Tag.findOrCreate({
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
      const error = new Error('Não existe nenhum quiz com o ID informado.');
      error.status = 404;
      throw error;
    }

    const image_quiz = await quiz.getImage_quiz();
    if (image_quiz) image_quiz.destroy();
    quiz.destroy();
  }
}

export default QuizService;

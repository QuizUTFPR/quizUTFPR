import * as Yup from 'yup';
import getAllMethods from '../../../utils/getMethodsOfAssociation';

// REPOSITORIES
import ClassRepository from '../../../repositories/Class';

class GetAllQuizzesFromClassService {
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

    console.log(getAllMethods(classInstance));
    const quizzes = await classInstance.getClass_quizzes();

    return quizzes;
  }
}

export default new GetAllQuizzesFromClassService();

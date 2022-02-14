import * as Yup from 'yup';
import ClassRepository from '../../repositories/Class';

class FindByPkClass {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { id } = data;

    const classInstance = await this.classRepository.findById(id);

    return classInstance;
  }
}

export default new FindByPkClass();

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
      const error = new Error('Falha na validação!');
      error.status = 403;
      throw error;
    }

    const classInstance = await this.classRepository.findById(data);

    return classInstance;
  }
}

export default new FindByPkClass();

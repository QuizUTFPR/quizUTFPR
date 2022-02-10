import * as Yup from 'yup';
import ClassRepository from '../../repositories/Class';

class DeleteClass {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(whereProp) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(whereProp))) {
      const error = new Error('Falha na validação!');
      error.status = 403;
      throw error;
    }

    const { id } = whereProp;
    const classInstance = await this.classRepository.delete({
      where: {
        id,
      },
    });

    return classInstance;
  }
}

export default new DeleteClass();

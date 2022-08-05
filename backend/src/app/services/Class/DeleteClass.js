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
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { id } = whereProp;

    const classInstance = await this.classRepository.findById(id);

    if (!classInstance) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não existe nenhum quiz com o ID informado.';
      throw error;
    }

    await classInstance.destroy();
  }
}

export default new DeleteClass();

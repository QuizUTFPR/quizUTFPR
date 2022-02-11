import crc32 from 'fast-crc32c';
import * as Yup from 'yup';
import ClassRepository from '../../repositories/Class';

class CreateClassService {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      idTeacher: Yup.number().required(),
      idImage: Yup.number(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error('Falha na validação!');
      error.status = 403;
      throw error;
    }

    const classInstance = await this.classRepository.create(data);

    const { id } = classInstance;
    const pin = crc32.calculate(toString(id));

    await this.classRepository.update(
      {
        pin,
      },
      {
        where: { id },
      }
    );

    return {
      ...classInstance.dataValues,
      pin,
    };
  }
}

export default new CreateClassService();

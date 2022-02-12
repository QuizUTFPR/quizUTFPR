import * as Yup from 'yup';

// MODELS
import ClassRepository from '../../repositories/Class';
import File from '../../models/FileModel';

class UpdateClass {
  constructor() {
    this.classRepository = new ClassRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      idImage: Yup.number(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error('Falha na validação!');
      error.status = 403;
      throw error;
    }

    const { id, idImage, title, description } = data;

    const classInstance = await this.classRepository.findById(id);
    classInstance.title = title;
    classInstance.description = description;

    // Image
    let oldImageId = false;

    if (idImage) {
      oldImageId = classInstance.idImage;
      classInstance.idImage = idImage;
    } else {
      classInstance.idImage = null;
    }

    await classInstance.save();
    if (oldImageId) {
      const image = await File.findByPk(oldImageId);
      await image.destroy();
    }

    return classInstance;
  }
}

export default new UpdateClass();

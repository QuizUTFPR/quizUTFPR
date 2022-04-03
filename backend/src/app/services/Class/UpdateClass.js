import * as Yup from 'yup';

// MODELS
import ClassRepository from '../../repositories/Class';
import FileRepository from '../../repositories/File';

class UpdateClass {
  constructor() {
    this.classRepository = new ClassRepository();
    this.fileRepository = new FileRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      idImage: Yup.number(),
      visibility: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.status = 403;
      error.response = 'Falha na validação!';
      throw error;
    }

    const { id, idImage, title, description, visibility } = data;

    const classInstance = await this.classRepository.findById(id);
    classInstance.title = title;
    classInstance.description = description;
    classInstance.visibility = visibility;

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
      const image = await this.fileRepository.findByPk(oldImageId);
      await image.destroy();
    }

    return classInstance;
  }
}

export default new UpdateClass();

import * as Yup from 'yup';
import { extname, resolve } from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Repositories
import StudentRepository from '../../repositories/Student';

// Models
import File from '../../models/FileModel';

class UpdateStudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required('Nickname é obrigatorio!'),
      avatar: Yup.string().required('Avatar é obrigatorio!'),
      isLocalImage: Yup.boolean(),
    });

    const validation = await schema.validate(data);

    if (!validation) {
      const error = new Error();
      error.response = validation.errors;
      error.status = 403;
      throw error;
    }

    const { id, name, avatar, isLocalImage } = data;

    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      const error = new Error();
      error.status = 403;
      error.response = 'ID inválido!';
      throw error;
    }

    student.name = name;

    let image;
    // Avatar
    if (avatar) {
      let path = avatar;

      if (isLocalImage) {
        path = crypto.randomBytes(16).toString('hex') + extname(avatar);

        fs.copyFileSync(
          resolve('avatars', avatar),
          resolve('tmp', 'uploads', path)
        );
      }

      image = await File.create({
        name: avatar,
        path,
      });

      student.idImage = image.id;
    }

    await student.save();

    const { email, id_image } = student;

    return {
      id,
      email,
      name,
      id_image,
      image: image?.url,
    };
  }
}

export default new UpdateStudentService();

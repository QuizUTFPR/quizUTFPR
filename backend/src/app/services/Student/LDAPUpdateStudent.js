import * as Yup from 'yup';
import { extname, resolve } from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Repositories
import StudentRepository from '../../repositories/Student';

// Models
import File from '../../models/FileModel';

class LDAPUpdateStudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      avatar: Yup.string(),
    });

    if (!(await schema.isValid(data))) {
      const error = new Error();
      error.response = 'Falha na validação!';
      error.status = 403;
      throw error;
    }

    const { id, name, avatar } = data;

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
      const path = crypto.randomBytes(16).toString('hex') + extname(avatar);

      fs.copyFileSync(
        resolve('avatars', avatar),
        resolve('tmp', 'uploads', path)
      );

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

export default new LDAPUpdateStudentService();

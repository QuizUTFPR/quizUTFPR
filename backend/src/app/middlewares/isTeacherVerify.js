import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

import TeacherRepository from '../repositories/Teacher';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: 'Falha na autenticação. Token não informado',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = id;
    const teacherRepository = new TeacherRepository();

    const teacher = await teacherRepository.findOne({ where: { id } });

    if (!teacher) {
      return res.status(401).json({ error: 'O usuário não é um professor!' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Falha na validação!' });
  }

  return next();
};

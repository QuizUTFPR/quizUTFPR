import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  // Ausência do token
  if (!authorization) {
    return res.status(401).json({
      error: 'Falha na autenticação, token não informado.',
    });
  }

  // Desestruturação de vetor (Bearer, ...token)
  const [, token] = authorization.split(' ');

  try {
    /**
     * É usado o promisify podemos usar o async/await
     * ao invés do velho callback do verify()
     */
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = id;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: 'Falha na autenticação, token inválido!',
    });
  }
  return next();
};

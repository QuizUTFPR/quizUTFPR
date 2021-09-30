import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class GenerateTokenProvider {
  async execute(id) {
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expireIn,
    });

    return token;
  }
}

export default new GenerateTokenProvider();

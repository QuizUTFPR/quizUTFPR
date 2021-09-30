import dayjs from 'dayjs';
import authConfig from '../../config/auth';
import RefreshToken from '../models/RefreshTokenModel';

class GenerateRefreshTokenProvider {
  async execute(userId) {
    try {
      const expiresIn = dayjs()
        .add(authConfig.refreshExpiration, 'hours')
        .unix();

      const generatedRefreshToken = await RefreshToken.create({
        user_id: userId,
        expires_in: expiresIn,
      });

      return generatedRefreshToken;
    } catch (error) {
      return error;
    }
  }
}

export default new GenerateRefreshTokenProvider();

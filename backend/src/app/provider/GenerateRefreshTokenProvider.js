import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import authConfig from '../../config/auth';

// REPOSITORIES
import RefreshTokenRepository from '../repositories/RefreshToken';

dayjs.extend(utc);

class GenerateRefreshTokenProvider {
  async execute(userId) {
    try {
      const expiresIn = dayjs
        .utc()
        .add(parseInt(authConfig.refreshExpiration), 'm')
        .format();

      const refreshTokenRepository = new RefreshTokenRepository();
      await refreshTokenRepository.delete({
        where: { user_id: userId },
      });

      const generatedRefreshToken = await refreshTokenRepository.create({
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

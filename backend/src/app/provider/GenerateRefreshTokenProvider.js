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
        .add(parseInt(authConfig.refreshExpiration, 10), 'm')
        .format();

      const refreshTokenRepository = new RefreshTokenRepository();
      await refreshTokenRepository.delete({
        where: { userId },
      });

      const generatedRefreshToken = await refreshTokenRepository.create({
        userId,
        expiresIn,
      });

      return generatedRefreshToken;
    } catch (error) {
      return error;
    }
  }
}

export default new GenerateRefreshTokenProvider();

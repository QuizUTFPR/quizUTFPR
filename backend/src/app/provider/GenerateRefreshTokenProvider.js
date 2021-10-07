import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import authConfig from '../../config/auth';
import RefreshToken from '../models/RefreshTokenModel';

dayjs.extend(utc);

class GenerateRefreshTokenProvider {
  async execute(userId) {
    try {
      const expiresIn = dayjs
        .utc()
        .add(parseInt(authConfig.refreshExpiration), 'm')
        .format();

      await RefreshToken.destroy({
        where: { user_id: userId },
      });

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

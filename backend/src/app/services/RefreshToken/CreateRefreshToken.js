import dayjs from 'dayjs';

// PROVIDERS
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';

// REPOSITORIES
import RefreshTokenRepository from '../../repositories/RefreshToken';

class CreateRefreshTokenService {
  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  async execute(data) {
    const { refreshToken } = data;

    const refreshTokenItem = await this.refreshTokenRepository.find({
      where: { id: refreshToken },
    });

    if (!refreshTokenItem)
      // eslint-disable-next-line no-throw-literal
      throw {
        status: 401,
        error: 'Invalid refresh token1!',
        refreshTokenExpired: true,
      };

    const refreshTokenExpired = dayjs().isAfter(
      dayjs(refreshTokenItem.expiresIn)
    );

    if (refreshTokenExpired)
      // eslint-disable-next-line no-throw-literal
      throw {
        status: 401,
        error: 'Invalid refresh token!',
        refreshTokenExpired: true,
      };

    const token = await GenerateTokenProvider.execute(refreshTokenItem.userId);

    return token;
  }
}

export default CreateRefreshTokenService;

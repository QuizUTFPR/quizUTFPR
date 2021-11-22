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
    const { refresh_token } = data;

    const refreshToken = await this.refreshTokenRepository.find({
      where: { id: refresh_token },
    });

    console.log('achado', refreshToken);

    if (!refreshToken)
      // eslint-disable-next-line no-throw-literal
      throw {
        status: 401,
        error: 'Invalid refresh token1!',
        refresh_token_expired: true,
      };

    const refreshTokenExpired = dayjs().isAfter(dayjs(refreshToken.expires_in));

    if (refreshTokenExpired)
      // eslint-disable-next-line no-throw-literal
      throw {
        status: 401,
        error: 'Invalid refresh token!',
        refresh_token_expired: true,
      };

    const token = await GenerateTokenProvider.execute(refreshToken.user_id);

    return token;
  }
}

export default CreateRefreshTokenService;

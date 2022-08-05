import RefreshTokenRepository from '../../repositories/RefreshToken';

class DeleteRefreshTokenService {
  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  async execute(where) {
    await this.refreshTokenRepository.delete(where);
  }
}

export default new DeleteRefreshTokenService();

import RefreshToken from '../models/RefreshTokenModel';

class RefreshTokenRepository {
  async create(data) {
    return RefreshToken.create(data);
  }

  async find(where) {
    return RefreshToken.findOne(where);
  }

  async delete(where) {
    return RefreshToken.destroy(where);
  }
}

export default RefreshTokenRepository;

// import dayjs from 'dayjs';
// import RefreshToken from '../../models/RefreshTokenModel';
// import GenerateTokenProvider from '../../provider/GenerateTokenProvider';

// SERVICES
import CreateRefreshTokenService from '../../services/RefreshToken/CreateRefreshToken';

class RefreshTokenController {
  async handle(req, res) {
    const { refreshToken } = req.body;

    try {
      const createRefreshTokenService = new CreateRefreshTokenService();
      const token = await createRefreshTokenService.execute({ refreshToken });

      return res.status(200).json({ token });
    } catch (error) {
      console.log('ERROR:', error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new RefreshTokenController();

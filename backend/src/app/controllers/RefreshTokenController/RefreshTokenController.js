// SERVICES
import CreateRefreshTokenService from '../../services/RefreshToken/CreateRefreshToken';

class RefreshTokenController {
  async handle(req, res) {
    try {
      const { refreshToken } = req.body;
      const token = await CreateRefreshTokenService.execute({ refreshToken });

      return res.status(200).json({ token });
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new RefreshTokenController();

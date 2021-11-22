// import dayjs from 'dayjs';
// import RefreshToken from '../../models/RefreshTokenModel';
// import GenerateTokenProvider from '../../provider/GenerateTokenProvider';

// SERVICES
import CreateRefreshTokenService from '../../services/RefreshToken/CreateRefreshToken';

class RefreshTokenController {
  // async handle(req, res) {
  //   try {
  //     const { refresh_token } = req.body;

  //     const refreshToken = await RefreshToken.findOne({
  //       where: { id: refresh_token },
  //     });

  //     console.log('achado', refreshToken);

  //     if (!refreshToken)
  //       return res.status(401).json({
  //         error: 'Invalid refresh token!',
  //         refresh_token_expired: true,
  //       });

  //     const refreshTokenExpired = dayjs().isAfter(
  //       dayjs(refreshToken.expires_in)
  //     );

  //     if (refreshTokenExpired)
  //       return res.status(401).json({
  //         error: 'Refresh token expired!',
  //         refresh_token_expired: true,
  //       });

  //     const token = await GenerateTokenProvider.execute(refreshToken.user_id);

  //     return res.status(200).json({ token });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json(error);
  //   }
  // }

  async handle(req, res) {
    const { refresh_token } = req.body;

    try {
      const createRefreshTokenService = new CreateRefreshTokenService();
      const token = await createRefreshTokenService.execute({ refresh_token });

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

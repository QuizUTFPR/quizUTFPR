import dayjs from 'dayjs';
import RefreshToken from '../../models/RefreshTokenModel';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';
import GenereateRefreshTokenProvider from '../../provider/GenerateRefreshTokenProvider';

class RefreshTokenController {
  async handle(req, res) {
    const { refresh_token } = req.body;

    const refreshToken = await RefreshToken.findOne({
      where: { id: refresh_token },
    });

    if (!refreshToken)
      return res.status(403).json({ error: 'Invalid refresh token!' });

    const refreshTokenExpired = dayjs().isAfter(refreshToken.expires_in);

    const token = await GenerateTokenProvider.execute(refreshToken.user_id);

    if (refreshTokenExpired) {
      await RefreshToken.destroy({
        where: { id: refreshToken.id },
      });

      const newRefreshToken = await GenereateRefreshTokenProvider.execute(
        refreshToken.user_id
      );

      console.log('New Refresh Token: ', newRefreshToken);

      return res
        .status(200)
        .json({ token, refresh_token: newRefreshToken.dataValues.id });
    }

    return res.status(200).json({ token });
  }
}

export default new RefreshTokenController();

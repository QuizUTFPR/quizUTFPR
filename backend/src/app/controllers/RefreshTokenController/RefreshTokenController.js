import dayjs from 'dayjs';
import RefreshToken from '../../models/RefreshTokenModel';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';

class RefreshTokenController {
  async handle(req, res) {
    try {
      const { refresh_token } = req.body;
  

      console.log(refresh_token)
      const refreshToken = await RefreshToken.findOne({
        where: { id: refresh_token },
      });

      console.log("achado", refreshToken)
  
      if (!refreshToken)
      return res.status(403).json({ error: 'Invalid refresh token!' });
      
      const refreshTokenExpired = dayjs().isAfter(dayjs(refreshToken.expires_in));
      
      
      if(refreshTokenExpired)
        return res.status(403).json({ error: 'Refresh token expired!' });
    
  
      const token = await GenerateTokenProvider.execute(refreshToken.user_id);
  
      return res
        .status(200)
        .json({ token });
      
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  }
}

export default new RefreshTokenController();

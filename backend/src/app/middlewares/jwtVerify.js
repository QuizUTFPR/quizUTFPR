import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (req, res, next) => {
  const token = req.headers['x-access-token'];

  if(!token)
    return res.status(401).json({auth: false, message: "Token não informado!"});

  jwt.verify(token, authConfig.secret, function(err, decoded){
    if(err)
      return res.status(500).json({auth: false, message: 'Token inválido.'});

    req.userId = decoded.id;
    next();
  });
}

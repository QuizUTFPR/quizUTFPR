require('dotenv').config();

export default {
  secret: process.env.SECRET,
  expireIn: process.env.EXPIRE_IN,
  refreshExpiration: process.env.REFRESH_EXPIRATION,
};

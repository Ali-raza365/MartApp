import { config as conf } from 'dotenv';
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  RefreshSecret: process.env.REFRESH_SECRET,
  Cookies_Secret: process.env.COOKIES_SECRET, // Fixed typo here

  // mailClientId: process.env.MAIL_CLIENT_ID,
  // mailClientSecret: process.env.MAIL_CLIENT_SECRET,
  // mailRefreshToken: process.env.MAIL_REFRESH_TOKEN,
  // senderEmailAddress: process.env.SENDER_EMAIL_ADDRESS,

  // cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  // cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  // cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
  // frontendDomain: process.env.FRONTEND_DOMAIN,
};

export const config = Object.freeze(_config);

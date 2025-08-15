import dotenv from 'dotenv';

dotenv.config();

const envData = {
  port: process.env.PORT || 3030,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default envData;

import 'dotenv/config'

const {
  MONGO_CONNECTION_STRING = '',
  JWT_SECRET = '',
  MONGO_USER = '',
  MONGO_PASS = '',
  PORT = 3000,
  NODE_ENV = 'development',
  TOKEN_EXP = '15m'
} = process.env

export default {
  MONGO_CONNECTION_STRING,
  JWT_SECRET,
  MONGO_USER,
  MONGO_PASS,
  PORT,
  NODE_ENV,
  TOKEN_EXP
}

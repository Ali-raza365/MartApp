import jwt from 'jsonwebtoken'
import { config } from './config.js'

export const generateTokens =async (payload) => {
  const accessToken =await jwt.sign({
    userId: payload._id, role: payload.role
  }, `${config.jwtSecret}`, { expiresIn: '1d' })


  const refreshToken =await jwt.sign({
    userId: payload._id, role: payload.role
  }, `${config.RefreshSecret}`, { expiresIn: '1d' })

  return { accessToken, refreshToken }
}




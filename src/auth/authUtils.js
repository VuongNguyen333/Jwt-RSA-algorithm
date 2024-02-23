'use-strict'
import jwt from 'jsonwebtoken'

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days'
    })
    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days'
    })

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        // console.log('🚀 ~ jwt.verify ~ err:', err)
        throw err
      } else {
        // console.log('🚀 ~ jwt.verify ~ decode:', decode)
      }
    })
    return { accessToken, refreshToken }
  } catch (error) {
    return null
  }
}

export const authUtils = {
  createTokenPair
}
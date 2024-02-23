/* eslint-disable no-useless-catch */
import shopModel from '~/models/shopModel'
import bcrypt from 'bcrypt'
const crypto = require('crypto')
import { keyTokenService } from './keyTokenService'
import { authUtils } from '~/auth/authUtils'
const RolesShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

const signup = async (reqBody) => {
  try {
    const email = reqBody.email
    const holderShop = await shopModel.findOne({ email }).lean()
    if (holderShop) {
      return {
        sta: 'xxx',
        message: 'Shop already registered'
      }
    }
    const createdShop = await shopModel.create({
      ...reqBody,
      password: await bcrypt.hash(reqBody.password, 10),
      roles: RolesShop.SHOP
    })

    if (createdShop) {
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        }
      })

      const publicKeyString = await keyTokenService.creatKeyToken({
        userId: createdShop._id,
        publicKey: publicKey
      })

      if (!publicKeyString) {
        return {
          code: 'xxxx',
          message: 'publicKeyString error'
        }
      }

      const publicKeyObject = crypto.createPublicKey(publicKeyString)
      // console.log('🚀 ~ signup ~ publicKeyObject:', publicKeyObject)

      // create token pair
      const tokens = await authUtils.createTokenPair({ userId: createdShop._id, email }, publicKeyObject, privateKey)
      // console.log('🚀 ~ signup ~ tokens:', tokens)
      return {
        code: 201,
        metadata: {
          shop: createdShop,
          token: tokens
        }
      }
    }
    return {
      code: 200,
      metadata: null
    }
  } catch (error) { throw error }
}

export const accessService = {
  signup
}
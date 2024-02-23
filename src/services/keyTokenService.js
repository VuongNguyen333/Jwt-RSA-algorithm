import keyTokenModel from '~/models/keyTokenModel'

const creatKeyToken = async ({ userId, publicKey }) => {
  try {
    const publicKeyString = publicKey.toString()
    const keyStore = await keyTokenModel.create({
      userId: userId,
      publicKey: publicKeyString
    })
    return keyStore ? keyStore.publicKey : null
  } catch (error) {
    return error
  }
}

export const keyTokenService = {
  creatKeyToken
}
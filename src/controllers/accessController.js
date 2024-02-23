import { StatusCodes } from 'http-status-codes'
import { accessService } from '~/services/accessService'
const signup = async (req, res, next) => {
  try {
    const createdModel = await accessService.signup(req.body)
    res.status(StatusCodes.CREATED).json(createdModel)
  } catch (error) {
    next(error)
  }
}

export const accessController = {
  signup
}
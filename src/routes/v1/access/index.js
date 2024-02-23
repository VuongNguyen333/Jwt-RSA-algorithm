'use-strict'
import { accessController } from '~/controllers/accessController'
import express from 'express'

const Router = express.Router()

Router.route('/shop/signup')
  .post(accessController.signup)

export const accessRouter = Router
import express from 'express'
import { accessRouter } from './access'
const Router = express.Router()

Router.use('/access', accessRouter)

export const APIS_V1 = Router
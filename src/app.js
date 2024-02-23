/* eslint-disable no-console */
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { enviroment } from '~/config/environment'
import { APIS_V1 } from '~/routes/v1'

const app = express()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

//init db
require('./dbs/init.mongodb')
// checkConnect.checkOverload()
app.use('/api/v1', APIS_V1)
// init route


app.listen(enviroment.config.app.PORT, enviroment.config.app.HOST, () => {
  console.log(`Hello VuongDev, I am running at http://${enviroment.config.app.HOST}:${enviroment.config.app.PORT}`)
})
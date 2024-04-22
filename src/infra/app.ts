import cors from 'cors'
import express, { Express } from 'express'

import { IocHttpContainer } from './container/ioc-http-container'

export class App {
  private app: Express

  constructor() {
    this.app = express()
  }

  createRoutes() {
    this.app.use(
      IocHttpContainer.createPaymentRouteInstance.create().expressRouter,
    )
    return this
  }

  useConfigs() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(cors())

    return this
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`App listening on port: ${port}`))
    return this
  }
}

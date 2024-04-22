import { NextFunction, Request, Response } from 'express'

import { EnvService } from '../env/env-service'

export class AccessTokenService {
  constructor(private envService: EnvService) {}

  handle(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization
    const appToken = this.envService.get('ACCESS_TOKEN')

    if (!accessToken) {
      return res
        .status(401)
        .send({ error: 'No token provided. Please provide an access token.' })
    }

    if (appToken !== accessToken) {
      return res.status(403).send({
        error: 'Access token is invalid. Please provide a valid access token.',
      })
    }

    next()
  }
}

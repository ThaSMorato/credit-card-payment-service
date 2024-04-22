import { AccessTokenService } from '@/infra/auth/access-token-service'

import { CreatePaymentController } from '../../controllers/create-payment-controller'
import { Router } from '../router'

export class CreatePaymentRoute extends Router {
  constructor(
    private accessTokenService: AccessTokenService,
    private createPaymentController: CreatePaymentController,
  ) {
    super()
  }

  create() {
    this.expressRouter.post(
      '/payments',
      this.accessTokenService.handle.bind(this.accessTokenService),
      this.createPaymentController.handle.bind(this.createPaymentController),
    )
    return this
  }
}

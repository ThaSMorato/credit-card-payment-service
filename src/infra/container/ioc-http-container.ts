import { CreatePaymentController } from '../http/controllers/create-payment-controller'
import { CreatePaymentRoute } from '../http/routes/card/create-payment-route'
import { IocServiceContainer } from './ioc-service-container'
import { IocUseCaseContainer } from './ioc-use-case-container'

class IocHttpContainerClass {
  private createPaymentController: CreatePaymentController
  private createPaymentRoute: CreatePaymentRoute

  private generateCreatePaymentController() {
    this.createPaymentController = new CreatePaymentController(
      IocUseCaseContainer.createPaymentUseCaseInstance,
      IocUseCaseContainer.validateCardUseCaseInstance,
    )
  }

  private generateCreatePaymentRoute() {
    this.createPaymentRoute = new CreatePaymentRoute(
      IocServiceContainer.accessTokenServiceInstance,
      this.createPaymentControllerInstance,
    )
  }

  get createPaymentControllerInstance(): CreatePaymentController {
    if (this.createPaymentController === undefined) {
      this.generateCreatePaymentController()
    }

    return this.createPaymentController
  }

  get createPaymentRouteInstance(): CreatePaymentRoute {
    if (this.createPaymentRoute === undefined) {
      this.generateCreatePaymentRoute()
    }

    return this.createPaymentRoute
  }
}

export const IocHttpContainer = new IocHttpContainerClass()

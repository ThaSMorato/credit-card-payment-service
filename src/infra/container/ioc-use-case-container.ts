import { CreatePaymentUseCase } from '@/card/application/use-cases/create-payment'
import { ValidateCardUseCase } from '@/card/application/use-cases/validate-card'

import { IocBankContainer } from './ioc-bank-container'
import { IocRepositoryContainer } from './ioc-repository-container'

class IocUseCaseContainerClass {
  private createPaymentUseCase: CreatePaymentUseCase
  private validateCardUseCase: ValidateCardUseCase

  private generateCreatePaymentUseCase() {
    this.createPaymentUseCase = new CreatePaymentUseCase(
      IocRepositoryContainer.prismaPaymentsRepositoryInstance,
    )
  }

  private generateValidateCardUseCase() {
    this.validateCardUseCase = new ValidateCardUseCase(
      IocBankContainer.bankCardCheckerInstance,
    )
  }

  get createPaymentUseCaseInstance(): CreatePaymentUseCase {
    if (this.createPaymentUseCase === undefined) {
      this.generateCreatePaymentUseCase()
    }

    return this.createPaymentUseCase
  }

  get validateCardUseCaseInstance(): ValidateCardUseCase {
    if (this.validateCardUseCase === undefined) {
      this.generateValidateCardUseCase()
    }

    return this.validateCardUseCase
  }
}

export const IocUseCaseContainer = new IocUseCaseContainerClass()

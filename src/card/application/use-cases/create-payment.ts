import { Payment } from '@/card/domain/entities/payment'
import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PaymentsRepository } from '../repositories/payments-repository'

interface CreatePaymentUseCaseRequest {
  cardToken: string
  value: number
}

type CreatePaymentUseCaseResponse = Either<null, { payment: Payment }>

export class CreatePaymentUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({
    cardToken,
    value,
  }: CreatePaymentUseCaseRequest): Promise<CreatePaymentUseCaseResponse> {
    const payment = Payment.create({
      cardToken: new UniqueEntityID(cardToken),
      value,
    })

    await this.paymentsRepository.create(payment)

    return right({
      payment,
    })
  }
}

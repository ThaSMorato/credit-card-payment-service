import { Either, left, right } from '@/core/either'
import { ExpiredCardError } from '@/core/errors/errors/expired-card-error'
import { InsufficientFundsError } from '@/core/errors/errors/insufficient-funds-error'
import { InvalidCardError } from '@/core/errors/errors/invalid-card-error'

import { CardChecker } from '../bank/card-checker'

interface ValidateCardUseCaseRequest {
  cvv: number
  number: string
  validationDate: string
}

type ValidateCardUseCaseResponse = Either<
  ExpiredCardError | InsufficientFundsError | InvalidCardError,
  { cardToken: string }
>

export class ValidateCardUseCase {
  constructor(private cardChecker: CardChecker) {}

  async execute({
    cvv,
    number,
    validationDate,
  }: ValidateCardUseCaseRequest): Promise<ValidateCardUseCaseResponse> {
    const serviceResponse = await this.cardChecker.checkCard({
      cvv,
      number,
      validationDate,
    })

    if (serviceResponse.response === 'INSUFFICIENT_FUNDS') {
      return left(new InsufficientFundsError())
    }

    if (serviceResponse.response === 'EXPIRED_CARD') {
      return left(new ExpiredCardError())
    }

    if (serviceResponse.response === 'INVALID_CARD') {
      return left(new InvalidCardError())
    }

    const { cardToken } = serviceResponse

    return right({
      cardToken,
    })
  }
}

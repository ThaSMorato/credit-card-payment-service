import { UseCaseError } from '@/core/errors/use-case-error'

export class InsufficientFundsError extends Error implements UseCaseError {
  public code: number
  constructor() {
    super('Your card was declined due to insufficient funds.')
    this.code = 409
  }
}

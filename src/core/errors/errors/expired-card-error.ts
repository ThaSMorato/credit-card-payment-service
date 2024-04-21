import { UseCaseError } from '@/core/errors/use-case-error'

export class ExpiredCardError extends Error implements UseCaseError {
  public code: number

  constructor() {
    super('Your card is expired.')
    this.code = 400
  }
}

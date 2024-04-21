import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidCardError extends Error implements UseCaseError {
  public code: number

  constructor() {
    super('User already exists')
    this.code = 400
  }
}

import { Mock } from 'vitest'

import { PaymentsRepository } from '@/card/application/repositories/payments-repository'

const create: Mock = vitest.fn()

export const paymentsFunction = {
  create,
}

export const mockPaymentsRepository: PaymentsRepository = paymentsFunction

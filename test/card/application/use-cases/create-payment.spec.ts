import { PaymentsRepository } from '@/card/application/repositories/payments-repository'
import { CreatePaymentUseCase } from '@/card/application/use-cases/create-payment'
import { Payment } from '@/card/domain/entities/payment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryPaymentsRepository } from '$/repositories/in-memory-payments-repository'
import {
  mockPaymentsRepository,
  paymentsFunction,
} from '$/repositories/mock-payments-repository'

let sut: CreatePaymentUseCase
let paymentsInMemoryRepository: PaymentsRepository

describe('Create Payment Use Case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      sut = new CreatePaymentUseCase(mockPaymentsRepository)
    })

    it('should call create function from repository', async () => {
      const response = await sut.execute({
        cardToken: 'a-card-token',
        value: 12000,
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value.payment).toBeInstanceOf(Payment)
      expect(paymentsFunction.create).toBeCalled()
    })
  })
  describe('Integration tests', () => {
    beforeEach(() => {
      paymentsInMemoryRepository = new InMemoryPaymentsRepository()
      sut = new CreatePaymentUseCase(paymentsInMemoryRepository)
    })

    it('Should create a payment', async () => {
      const response = await sut.execute({
        cardToken: 'a-card-token',
        value: 12000,
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        payment: expect.objectContaining({
          cardToken: new UniqueEntityID('a-card-token'),
          value: 12000,
        }),
      })
    })
  })
})

import { CardChecker } from '@/card/application/bank/card-checker'
import { ValidateCardUseCase } from '@/card/application/use-cases/validate-card'
import { ExpiredCardError } from '@/core/errors/errors/expired-card-error'
import { InsufficientFundsError } from '@/core/errors/errors/insufficient-funds-error'
import { InvalidCardError } from '@/core/errors/errors/invalid-card-error'

import { FakeCardChecker } from '../bank/fake-card-checker'
import {
  cardCheckerFunctions,
  mockCardChecker,
} from '../bank/mock-card-checker'

let sut: ValidateCardUseCase
let fakeCardChecker: CardChecker

describe('Validate Card Use Case', () => {
  beforeAll(() => {
    vitest.useFakeTimers({ now: new Date('2024-02-01T05:00:00') })
  })

  afterAll(() => {
    vitest.clearAllTimers()
  })
  describe('Unit tests', () => {
    beforeEach(() => {
      vitest.clearAllMocks()
      sut = new ValidateCardUseCase(mockCardChecker)
    })

    it('should return the cardToken', async () => {
      cardCheckerFunctions.checkCard.mockResolvedValue({
        response: 'VALID',
        cardToken: 'a-card-token',
      })

      const response = await sut.execute({
        cvv: 123,
        number: '7676 7676 7676 7676',
        validationDate: '12/35',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        cardToken: 'a-card-token',
      })
      expect(cardCheckerFunctions.checkCard).toBeCalled()
    })

    it('should return an error if card has no funds', async () => {
      cardCheckerFunctions.checkCard.mockResolvedValue({
        response: 'INSUFFICIENT_FUNDS',
      })

      const response = await sut.execute({
        cvv: 123,
        number: '7676 7676 7676 7676',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(InsufficientFundsError)
      expect(cardCheckerFunctions.checkCard).toBeCalled()
    })

    it('should return an error if card is invalid', async () => {
      cardCheckerFunctions.checkCard.mockResolvedValue({
        response: 'EXPIRED_CARD',
      })

      const response = await sut.execute({
        cvv: 123,
        number: '7676 7676 7676 7676',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ExpiredCardError)
      expect(cardCheckerFunctions.checkCard).toBeCalled()
    })

    it('should return an error if card is invalid', async () => {
      cardCheckerFunctions.checkCard.mockResolvedValue({
        response: 'INVALID_CARD',
      })

      const response = await sut.execute({
        cvv: 123,
        number: '7676 7676 7676 7676',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(InvalidCardError)
      expect(cardCheckerFunctions.checkCard).toBeCalled()
    })
  })

  describe('Integration tests', () => {
    beforeEach(() => {
      fakeCardChecker = new FakeCardChecker()
      sut = new ValidateCardUseCase(fakeCardChecker)
    })

    it('should return the card token if card is valid', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '5241 1458 8545 8545',
        validationDate: '12/35',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        cardToken: expect.any(String),
      })
    })

    it('should return an error if card number is a repeated number', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '1111 1111 1111 1111',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(InvalidCardError)
    })

    it('should return an error if card number is invalid', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '4585 8855 4588 452',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(InvalidCardError)
    })

    it('should return an error if card number has letters', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '4585 8855 4588 452A',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(InvalidCardError)
    })

    it('should return an error if card number has letters', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '4585 8855 4588 452A',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(InvalidCardError)
    })

    it('should return an error if card does not have funds', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '1234 1234 1234 1234',
        validationDate: '12/35',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(InsufficientFundsError)
    })

    it('should return an error if card`s expiration date year is behind todays', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '5487 5485 6545 2315',
        validationDate: '12/22',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ExpiredCardError)
    })

    it('should return an error if card`s expiration date month is behind todays', async () => {
      const response = await sut.execute({
        cvv: 123,
        number: '5487 5485 6545 2315',
        validationDate: '01/24',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ExpiredCardError)
    })
  })
})

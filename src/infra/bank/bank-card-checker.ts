import {
  Card,
  CardChecker,
  CheckerResponse,
} from '@/card/application/bank/card-checker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class BankCardChecker implements CardChecker {
  private invalidCheck(numberRaw: string) {
    const number = numberRaw.replaceAll(' ', '')

    if (number.length !== 16) {
      return true
    }

    if (!/^\d+$/.test(number)) {
      return true
    }

    if (/^(\d)\1{15}$/.test(number)) {
      return true
    }

    return false
  }

  private noFundsCheck(numberRaw: string) {
    const number = numberRaw.replaceAll(' ', '')

    return number === '1234123412341234'
  }

  private expiratedCheck(validationDate: string) {
    const [validationMonth, smallYear] = validationDate.split('/')

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    const validationYear = Number(`20${smallYear}`)

    if (validationYear < year) {
      return true
    }

    if (validationYear === year) {
      if (Number(validationMonth) < month) {
        return true
      }
    }

    return false
  }

  async checkCard(card: Card): Promise<CheckerResponse> {
    if (this.invalidCheck(card.number)) {
      return {
        response: 'INVALID_CARD',
      }
    }

    if (this.noFundsCheck(card.number)) {
      return {
        response: 'INSUFFICIENT_FUNDS',
      }
    }

    if (this.expiratedCheck(card.validationDate)) {
      return {
        response: 'EXPIRED_CARD',
      }
    }

    return {
      response: 'VALID',
      cardToken: String(new UniqueEntityID()),
    }
  }
}

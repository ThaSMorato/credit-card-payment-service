export interface Card {
  number: string
  validationDate: string
  cvv: number
}

type ResponseEnum =
  | 'VALID'
  | 'INSUFFICIENT_FUNDS'
  | 'INVALID_CARD'
  | 'EXPIRED_CARD'

export interface CheckerResponse {
  response: ResponseEnum
  cardToken?: string
}

export interface CardChecker {
  checkCard(card: Card): Promise<CheckerResponse>
}

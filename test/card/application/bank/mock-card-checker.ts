import { Mock } from 'vitest'

import { CardChecker } from '@/card/application/bank/card-checker'

const checkCard: Mock = vitest.fn()

export const cardCheckerFunctions = {
  checkCard,
}

export const mockCardChecker: CardChecker = cardCheckerFunctions

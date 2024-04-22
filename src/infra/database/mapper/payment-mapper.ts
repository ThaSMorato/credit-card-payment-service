import { Payment as PrismaPayment } from '@prisma/client'

import { Payment } from '@/card/domain/entities/payment'

export class PaymentMapper {
  static toPrisma({ cardToken, createdAt, id, value }: Payment): PrismaPayment {
    return {
      cardToken: String(cardToken),
      createdAt,
      id: String(id),
      value,
    }
  }
}

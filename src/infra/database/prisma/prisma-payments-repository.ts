import { PaymentsRepository } from '@/card/application/repositories/payments-repository'
import { Payment } from '@/card/domain/entities/payment'

import { PaymentMapper } from '../mapper/payment-mapper'
import { PrismaService } from '../prisma-service'

export class PrismaPaymentsRepository implements PaymentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(payment: Payment): Promise<void> {
    const data = PaymentMapper.toPrisma(payment)

    await this.prisma.payment.create({
      data,
    })
  }
}

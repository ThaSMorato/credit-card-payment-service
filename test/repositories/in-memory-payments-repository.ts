import { PaymentsRepository } from '@/card/application/repositories/payments-repository'
import { Payment } from '@/card/domain/entities/payment'

export class InMemoryPaymentsRepository implements PaymentsRepository {
  public items: Payment[] = []

  async create(payment: Payment): Promise<void> {
    this.items.push(payment)
  }
}

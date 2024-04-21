import { Payment } from '@/card/domain/entities/payment'

export interface PaymentsRepository {
  create(payment: Payment): Promise<void>
}

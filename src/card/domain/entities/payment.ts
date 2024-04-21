import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface PaymentProps {
  value: number
  createdAt: Date
  cardToken: UniqueEntityID
}

export class Payment extends Entity<PaymentProps> {
  static create(
    props: Optional<PaymentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const payment = new Payment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return payment
  }

  get value() {
    return this.props.value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get cardToken() {
    return this.props.cardToken
  }
}

import { Request, Response } from 'express'
import z from 'zod'

import { CreatePaymentUseCase } from '@/card/application/use-cases/create-payment'
import { ValidateCardUseCase } from '@/card/application/use-cases/validate-card'

const createPaymentBodySchema = z.object({
  cvv: z.number().min(1),
  number: z.string(),
  validationDate: z.string(),
  value: z.number().min(1),
})

export class CreatePaymentController {
  constructor(
    private createPaymentUseCase: CreatePaymentUseCase,
    private validateCardUseCase: ValidateCardUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const parsedBody = createPaymentBodySchema.safeParse(req.body)

    if (!parsedBody.success) {
      return res.status(400).send({ error: 'Invalid data' })
    }

    const { cvv, number, validationDate, value } = parsedBody.data

    const validateResponse = await this.validateCardUseCase.execute({
      cvv,
      number,
      validationDate,
    })

    if (validateResponse.isLeft()) {
      const error = validateResponse.value

      return res.status(error.code).send({ error: error.message })
    }

    const { cardToken } = validateResponse.value

    await this.createPaymentUseCase.execute({
      cardToken,
      value,
    })

    return res.status(201).send()
  }
}

import request from 'supertest'

import { App } from '@/infra/app'
import { IocServiceContainer } from '@/infra/container/ioc-service-container'
import { PrismaService } from '@/infra/database/prisma-service'
import { EnvService } from '@/infra/env/env-service'

let app: App
let prisma: PrismaService
let envService: EnvService

describe('Create Payment Route e2e test', () => {
  beforeAll(() => {
    app = new App()

    app.useConfigs().createRoutes()

    prisma = IocServiceContainer.prismaServiceInstance
    envService = IocServiceContainer.envServiceInstance
  })

  describe('[POST] /payments', () => {
    it('Should create a payment', async () => {
      const token = envService.get('ACCESS_TOKEN')

      const response = await request(app.httpServerInstance)
        .post('/payments')
        .set('Authorization', token)
        .send({
          cvv: 123,
          number: '1235 1255 2564 5542',
          value: 15000,
          validationDate: '12/35',
        })

      const inDatabasePayment = await prisma.payment.findFirst()

      expect(response.statusCode).toBe(201)
      expect(inDatabasePayment).toEqual(
        expect.objectContaining({
          value: 15000,
        }),
      )
    })

    it('Should give unauthorized error if authorization token is wrong', async () => {
      const token = envService.get('ACCESS_TOKEN')

      const response = await request(app.httpServerInstance)
        .post('/payments')
        .set('Authorization', `not_${token}`)
        .send({
          cvv: 123,
          number: '1235 1255 2564 5542',
          value: 15000,
          validationDate: '12/35',
        })

      expect(response.statusCode).toBe(403)
      expect(response.body).toEqual({
        error: 'Access token is invalid. Please provide a valid access token.',
      })
    })

    it('Should give expired card error if card validation date is expired', async () => {
      const token = envService.get('ACCESS_TOKEN')

      const response = await request(app.httpServerInstance)
        .post('/payments')
        .set('Authorization', token)
        .send({
          cvv: 123,
          number: '1235 1255 2564 5542',
          value: 15000,
          validationDate: '12/20',
        })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        error: 'Your card is expired.',
      })
    })

    it('Should give insufficient funds error if card number is 1234 times 4', async () => {
      const token = envService.get('ACCESS_TOKEN')

      const response = await request(app.httpServerInstance)
        .post('/payments')
        .set('Authorization', token)
        .send({
          cvv: 123,
          number: '1234 1234 1234 1234',
          value: 15000,
          validationDate: '12/35',
        })

      expect(response.statusCode).toBe(409)
      expect(response.body).toEqual({
        error: 'Your card was declined due to insufficient funds.',
      })
    })

    it('Should give invalid card error if card number is repeated the same number', async () => {
      const token = envService.get('ACCESS_TOKEN')

      const response = await request(app.httpServerInstance)
        .post('/payments')
        .set('Authorization', token)
        .send({
          cvv: 123,
          number: '9999 9999 9999 9999',
          value: 15000,
          validationDate: '12/35',
        })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        error: 'Invalid card.',
      })
    })
  })
})

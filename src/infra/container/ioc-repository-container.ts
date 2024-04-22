import { PrismaPaymentsRepository } from '../database/prisma/prisma-payments-repository'
import { IocServiceContainer } from './ioc-service-container'

class IocRepositoryContainerClass {
  private prismaPaymentsRepository: PrismaPaymentsRepository

  private generatePrismaPaymentsRepository() {
    this.prismaPaymentsRepository = new PrismaPaymentsRepository(
      IocServiceContainer.prismaServiceInstance,
    )
  }

  get prismaPaymentsRepositoryInstance(): PrismaPaymentsRepository {
    if (this.prismaPaymentsRepository === undefined) {
      this.generatePrismaPaymentsRepository()
    }

    return this.prismaPaymentsRepository
  }
}

export const IocRepositoryContainer = new IocRepositoryContainerClass()

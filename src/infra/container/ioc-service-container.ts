import { AccessTokenService } from '../auth/access-token-service'
import { PrismaService } from '../database/prisma-service'
import { EnvService } from '../env/env-service'

class IocServiceContainerClass {
  private envService: EnvService
  private accessTokenService: AccessTokenService
  private prismaService: PrismaService

  constructor() {
    this.envService = new EnvService()
    this.prismaService = new PrismaService()
  }

  get envServiceInstance(): EnvService {
    return this.envService
  }

  get prismaServiceInstance(): PrismaService {
    return this.prismaService
  }

  private generateAccessTokenService() {
    this.accessTokenService = new AccessTokenService(this.envServiceInstance)
  }

  get accessTokenServiceInstance(): AccessTokenService {
    if (this.accessTokenService === undefined) {
      this.generateAccessTokenService()
    }

    return this.accessTokenService
  }
}

export const IocServiceContainer = new IocServiceContainerClass()

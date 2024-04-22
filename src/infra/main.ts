import { App } from './app'

const bootstrap = () => {
  const app = new App()

  app.useConfigs().createRoutes().listen(3333)
}

bootstrap()

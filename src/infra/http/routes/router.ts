import { Router as ExpressRouter } from 'express'

export class Router {
  private router: ExpressRouter

  constructor() {
    this.router = ExpressRouter()
  }

  get expressRouter() {
    return this.router
  }
}

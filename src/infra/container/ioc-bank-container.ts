import { BankCardChecker } from '../bank/bank-card-checker'

class IocBankContainerClass {
  private bankCardChecker: BankCardChecker

  constructor() {
    this.bankCardChecker = new BankCardChecker()
  }

  get bankCardCheckerInstance(): BankCardChecker {
    return this.bankCardChecker
  }
}

export const IocBankContainer = new IocBankContainerClass()

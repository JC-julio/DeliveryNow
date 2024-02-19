import { cpf } from 'cpf-cnpj-validator'

export default class CPFValidator {
    value: string
  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("CPF inválido");
    }
    this.value = value
  }

  private isValid(value: string): boolean {
    return cpf.isValid(value);
  }
}
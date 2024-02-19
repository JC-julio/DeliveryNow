import { cnpj } from 'cpf-cnpj-validator';

export default class CNPJValidator {
    value: string
  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("CNPJ inválido");
    }
    this.value = value
  }

  private isValid(value: string): boolean {
    return cnpj.isValid(value);
  }
}
import * as EmailValidator from 'email-validator';

export default class EMAILValidator {
    value: string
  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("Email inválido");
    }
    this.value = value
  }

  private isValid(value: string): boolean {
    return EmailValidator.validate(value);
  }
}

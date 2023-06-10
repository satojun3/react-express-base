export default class BadRequestError extends Error {
  status: number;
  validation: any;

  constructor(message?: string, validation?: any) {
    super(message); // Pass the message property to the Error class
    this.name = this.constructor.name;
    this.status = 400;
    this.validation = validation;
  }
}

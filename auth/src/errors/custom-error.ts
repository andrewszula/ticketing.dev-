export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(massage: string) {
    super(massage);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

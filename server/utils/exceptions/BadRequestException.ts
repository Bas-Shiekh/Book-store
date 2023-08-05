import CustomError from "../CustomError";

class BadRequestException extends CustomError {
  public message: string;

  constructor(message: string = "Bad Request Exception") {
    super(400, message);
    this.message = message;
  }
}

export default BadRequestException;

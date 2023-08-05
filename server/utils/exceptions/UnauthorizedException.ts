import CustomError from "../CustomError";

class UnauthorizedException extends CustomError {
  public message: string;

  constructor(message: string = "Unauthorized Exception") {
    super(401, message);
    this.message = message;
  }
}

export default UnauthorizedException;

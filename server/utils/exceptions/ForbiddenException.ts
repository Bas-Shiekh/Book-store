import CustomError from "../CustomError";

class ForbiddenException extends CustomError {
  public message: string;

  constructor(message: string = "Forbidden Exception") {
    super(403, message);
    this.message = message;
  }
}

export default ForbiddenException;

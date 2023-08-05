import CustomError from "../CustomError";

class NotFoundException extends CustomError {
  public message: string;

  constructor(message: string = "Not Found Exception") {
    super(404, message);
    this.message = message;
  }
}

export default NotFoundException;

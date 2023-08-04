import { Request } from "express";

export interface TokenPayloadInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  iat?: string;
}

export interface UserRequestInterface extends Request {
  user: TokenPayloadInterface;
}

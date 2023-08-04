export interface registerInterface {
  firstName: string,
  lastName: string,
  email: string
  password: string,
  confirmationPassword?: string,
}

export interface loginInterface {
  email: string;
  password: string;
}

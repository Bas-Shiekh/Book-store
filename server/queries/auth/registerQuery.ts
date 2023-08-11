import { registerInterface } from "../../interfaces/auth";
import { User } from "../../models";

const registerQuery = ({
  firstName,
  lastName,
  email,
  password,
  image,
}: registerInterface) => User.create({
  first_name: firstName,
  last_name: lastName,
  email,
  password,
  image,
});

export default registerQuery;

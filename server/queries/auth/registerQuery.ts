import { registerInterface } from "../../interfaces/register";
import { User } from "../../models";

const registerQuery = ({
  firstName,
  lastName,
  email,
  password,
}: registerInterface) => User.create({
  first_name: firstName,
  last_name: lastName,
  email,
  password,
});

export default registerQuery;

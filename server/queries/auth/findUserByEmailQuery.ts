import { User } from "../../models";

const findUserByEmailQuery = (email: string) => User.findOne({ where: { email } });

export default findUserByEmailQuery;

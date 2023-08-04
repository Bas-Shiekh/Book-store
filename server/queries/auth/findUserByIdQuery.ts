import { User } from "../../models";

const findUserByIdQuery = (id: number) => User.findOne({ where: { id } });

export default findUserByIdQuery;

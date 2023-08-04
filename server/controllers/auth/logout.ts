import { Request, Response } from "express";

const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "logged out successfully" });
};

export default logoutController;

/* eslint-disable no-unused-vars */
import { join } from "path";
import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import multer from "multer";

import router from "./routers";
import config from "./config/environment";

const upload = multer();

const app = express();

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.any());
app.disable("x-powered-by");

app.use("/api/v1", router);

app.set("port", process.env.PORT || 8080);

if (config.nodeEnv === "production") {
  app.use(express.static(join(__dirname, "..", "client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ message: err.message, status: err.status });
});

export default app;

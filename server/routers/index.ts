/* eslint-disable no-unused-vars */
import { Router } from 'express';
import authRouter from './auth';

const router = Router();

router.use("/auth", authRouter);

export default router;

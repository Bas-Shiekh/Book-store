import {
  register,
} from '../controllers/auth';

const authRouter = require('express').Router();

authRouter.post('/auth/register', register);

export default authRouter;

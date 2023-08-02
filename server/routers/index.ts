/* eslint-disable no-unused-vars */
import { Router } from 'express';

const router = Router();

router.use('/', (res, req) => {
  console.log('hello');
});

export default router;

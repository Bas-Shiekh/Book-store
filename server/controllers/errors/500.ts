/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';

const serverError: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message || 'Internal server error!' });
};

export default serverError;

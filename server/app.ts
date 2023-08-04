/* eslint-disable no-unused-vars */
import { join } from 'path';
import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import router from './routers';
import config from './config/environment';
import { notFound, serverError } from './controllers/errors';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

app.use('/api/v1', router);

app.set('port', process.env.PORT || 8080);

if (config.nodeEnv === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(serverError);
app.use(notFound);

export default app;

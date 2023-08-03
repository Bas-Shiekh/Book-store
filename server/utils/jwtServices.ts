import { verify, sign, Secret } from 'jsonwebtoken';

import config from '../config/environment';

import { PayloadInterface } from '../interfaces/payload';

const signToken = (payload: PayloadInterface) => new Promise((resolve, reject) => {
  sign(payload, config.secretKey as Secret, (err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

const verifyToken = (token: string) => new Promise((resolve, reject) => {
  verify(token, config.secretKey as Secret, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      resolve(decoded);
    }
  });
});

export { verifyToken, signToken };

import { randomUUID, randomBytes } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { sign, verify, decode, JwtPayload } from 'jsonwebtoken';
import { encrypt, decrypt } from '../helpers/utils';
import { CreateTokenInput, CustomRequest } from '../types';
import { db } from '../clients/firestore.client';

const collectionName = 'secrets';
const collection = db.collection(collectionName);

export async function issueToken(userInput: CreateTokenInput) {
  const { username } = userInput;
  const secret = encrypt(randomBytes(64).toString('hex').substring(0, 64));

  const secretId = randomUUID();
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const docRef = collection.doc(secretId);

  await docRef.set({
    secret,
    username,
    createdAt,
    updatedAt,
    revokedAt: null,
  });

  const payload: JwtPayload = {
    secretId,
    username,
    sub: secretId,
  };

  const accessToken = sign(payload, secret);

  return {
    accessToken,
  };
}

/**
 * Middleware to authenticate the token
 * @param req Request object
 * @param res Response object
 * @param next Next function
 * @returns void
 * @throws Error 
 */
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try{
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('No token provided');
    }

    interface JwtDecoded {
      secretId: string;
      secret: string;
    }
    const jwt = decode(token);
    const { secretId } = jwt as JwtDecoded;

    const document = await collection.doc(secretId).get();

    if (!document.exists) {
      throw new Error('Api Key not found');
    }

    const decoded = verify(token, decrypt(document.data()?.secret));
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
}

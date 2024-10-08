import { randomUUID } from 'crypto';
import { generateRandomString, responseDecorator } from '../helpers/utils';
import { CreateShortUrlInput, ShortUrl } from '../types';
import { db } from '../clients/firestore.client';

const collectionName = 'url-chopper';
const collection = db.collection(collectionName);

export async function createShortUrl(shortUrl: CreateShortUrlInput) {
  const { url } = shortUrl;
  const document = await collection.where('url', '==', url).get();

  if (!document.empty) {
    throw new Error('URL already exists, you can only update it');
  }

  const id = randomUUID();
  const shortCode = generateRandomString(); // Need to check if shortCode already exists in DB to avoid collision

  const docRef = collection.doc(id);

  await docRef.set({
    url,
    shortCode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accessCount: 0,
  });

  const shortUrlResponse = {
    id,
    url,
    shortCode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return responseDecorator(shortUrlResponse);
}

export async function getShortUrl(shortCode: string) {
  const document = await collection.where('shortCode', '==', shortCode).get();

  if (document.empty) {
    throw new Error('Short URL not found');
  }

  await collection.doc(document.docs[0].id).update({
    accessCount: document.docs[0].data()?.accessCount + 1,
  });

  const data = document.docs[0].data() as ShortUrl;
  delete data.accessCount;
  return responseDecorator(data);
}

export async function updateShortUrl(shortCode: string, url: string) {
  const document = await collection.where('shortCode', '==', shortCode).get();

  if (document.empty) {
    throw new Error('Short URL not found');
  }

  const updatedDate = new Date().toISOString();

  await collection.doc(document.docs[0].id).update({
    url,
    updatedAt: updatedDate,
  });

  const shortUrlResponse = {
    id: document.docs[0].id,
    url,
    shortCode,
    createdAt: document.docs[0].data()?.createdAt,
    updatedAt: updatedDate,
  };

  return responseDecorator(shortUrlResponse as ShortUrl);
}

export async function deleteShortUrl(shortCode: string) {
  const document = await collection.where('shortCode', '==', shortCode).get();

  if (document.empty) {
    throw new Error('Short URL not found');
  }

  await collection.doc(document.docs[0].id).delete();
}

export async function getShortUrlStats(shortCode: string) {
  const document = await collection.where('shortCode', '==', shortCode).get();

  if (document.empty) {
    throw new Error('Short URL not found');
  }

  return responseDecorator(document.docs[0].data() as ShortUrl);
}

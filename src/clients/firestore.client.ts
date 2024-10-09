import { Firestore } from '@google-cloud/firestore';


/**
 * Firestore client
 * @type {Firestore}
 * @see https://googleapis.dev/nodejs/firestore/latest/Firestore.html
 */
export const db = new Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID || 'fourth-tiger-437722-i4',
});

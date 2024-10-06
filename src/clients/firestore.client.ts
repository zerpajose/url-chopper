import { Firestore } from '@google-cloud/firestore';

export const db = new Firestore({
  projectId: process.env.GCLOUD_PROJECT_ID,
  // keyFilename: '/path/to/keyfile.json',
});

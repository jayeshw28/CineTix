import * as admin from "firebase-admin";

const privateKey = process.env.firebasePrivateKey;

console.log("admin.apps.length", admin.apps.length);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.firebaseClientEmail,
      privateKey: privateKey,
      projectId: process.env.firebaseProjectId,
    }),
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  });
}
export const adminStorage = admin.storage();
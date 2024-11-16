// src/firebase/firebase.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    public firestore: admin.firestore.Firestore;

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Correctly replace the newlines
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
        });
        this.firestore = admin.firestore();
    }

}

import firebase from 'firebase';
import { firebaseConfig } from './firebase.config.js';

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
const firebaseStorage = firebaseApp.storage();
const firebaseDB = firebaseApp.database();

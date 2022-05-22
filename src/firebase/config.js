import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJurrf4Mb3wjHMc4u10RtsQtTm2ALhd88",
    authDomain: "petstore-6355a.firebaseapp.com",
    projectId: "petstore-6355a",
    storageBucket: "petstore-6355a.appspot.com",
    messagingSenderId: "575578043808",
    appId: "1:575578043808:web:a0e3546eab9d7116bda0c5",
    measurementId: "G-FM7ZRBN4JK"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
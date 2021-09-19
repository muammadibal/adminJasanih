import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB4rtTyRo-pMcuiN0nTCt00PZTrp4pQmLs',
  authDomain: 'jasanih-e97cd.firebaseapp.com',
  databaseURL: 'https://jasanih-e97cd-default-rtdb.firebaseio.com',
  projectId: 'jasanih-e97cd',
  storageBucket: 'jasanih-e97cd.appspot.com',
  messagingSenderId: '609300900197',
  appId: '1:609300900197:web:fb854710e31665739bd98c',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { db, auth };

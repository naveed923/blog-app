import { initializeApp } from "firebase/app";
import  {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDr53hXEosV5lPrgDbScYUxhPhngXNmwds",
  authDomain: "blogwebapplication-ac56c.firebaseapp.com",
  projectId: "blogwebapplication-ac56c",
  storageBucket: "blogwebapplication-ac56c.appspot.com",
  messagingSenderId: "418440688678",
  appId: "1:418440688678:web:4e9801ae3399081c8ba2e7"
};


const app = initializeApp(firebaseConfig);
export const database=getAuth(app);
export const fireStoreReference=getFirestore(app);
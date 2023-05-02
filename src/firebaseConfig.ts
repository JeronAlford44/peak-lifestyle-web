import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyDjN0OJDW7om1zm7whd5-5rTmbeXDPIzTA',
  authDomain: 'peak-lifestyle-web.firebaseapp.com',
  projectId: 'peak-lifestyle-web',
  storageBucket: 'peak-lifestyle-web.appspot.com',
  messagingSenderId: '38291866815',
  appId: '1:38291866815:web:4d2809d4014ee73cf2f20a',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const dbh = getFirestore(app)

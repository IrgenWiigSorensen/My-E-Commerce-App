import { initializeApp } from 'firebase/app';
import { 
  getAuth,  
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXEk032GNCfsu836jAZ-yGhbrlG6PGsGc",
  authDomain: "e-commerce-db-9ca7e.firebaseapp.com",
  projectId: "e-commerce-db-9ca7e",
  storageBucket: "e-commerce-db-9ca7e.appspot.com",
  messagingSenderId: "684929070413",
  appId: "1:684929070413:web:2efe16ab633f05e2563304"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); 

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {displayName: ''}
) => { 
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  //If user does not exist
  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date(); 

    try {
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('there was an error', error.message)
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; 

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; 

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth); 

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

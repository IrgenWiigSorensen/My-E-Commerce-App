import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect,  
  GoogleAuthProvider, 
  signInWithPopup
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

const provider = new GoogleAuthProvider(); 

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth) => {
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
        createdAt
      });
    } catch (error) {
      console.log('there was an error', error.message)
    }
  }

  return userDocRef;


}
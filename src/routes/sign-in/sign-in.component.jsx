import { 
  signInWithGooglePopup,  
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

  const logGooglePopupUser = async () => {
    const {user} = await signInWithGooglePopup(); 
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={logGooglePopupUser}> Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn; 
import { 
  signInWithGooglePopup,  
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import Button from '../../components/button/button.component';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

  const logGooglePopupUser = async () => {
    const {user} = await signInWithGooglePopup(); 
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign in</h1>
      <Button buttonType={'google'} onClick={logGooglePopupUser}> SIGN IN WITH GOOGLE</Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn; 
import { useState } from 'react'; 

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '', 
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); 
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup(); 
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value})
  }

  return(
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput 
          label="Email"
          type="email" 
          required 
          onChange={handleChange} 
          name='email'
          value={email} 
        />

        <FormInput 
          label="Password"
          type="password" 
          required 
          onChange={handleChange} 
          name='password' 
          value={password}
        />
        <div className='buttons-container'>
          <Button buttonType='default' type="submit">SIGN IN</Button>
          <Button buttonType='google' onClick={signInWithGoogle} >GOOOGLE SIGN IN</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
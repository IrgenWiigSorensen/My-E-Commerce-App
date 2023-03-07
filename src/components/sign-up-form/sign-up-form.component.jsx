import { useState } from 'react'; 

const defaultFormFields = {
  displayName: '', 
  email: '',
  password: '', 
  corfirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); 
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name } = event;
  }

  return(
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={()=> {}}>
        <label>Display Name</label>
        <input type="text" required onChange={handleChange} name='displayName' value={displayName}/>

        <label>Email</label>
        <input type="email" required onChange={handleChange} name='email' />

        <label>Password</label>
        <input type="password" required onChange={handleChange} name='password' />

        <label>Confirm Password</label>
        <input type="password" required onChange={handleChange} name='confirmPassword' />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
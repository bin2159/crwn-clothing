import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../util/firebase/firebaseutil";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";
const SignUpForm = () => {
  const defaultFormFeild = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formField, setFormField] = useState(defaultFormFeild);
  const { displayName, email, password, confirmPassword } = formField;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password!=confirmPassword){
        alert('Password do not match')
        return 
    }
    const  resetFormField=()=>{
        setFormField(defaultFormFeild)
    }
    try{
        const {user} = await createAuthUserWithEmailAndPassword(email,password)
        const userDocRef=await createUserDocFromAuth(user,{displayName})
        resetFormField()
    }
    catch(error){
        console.log(error)
    }

  };
  return (
    <div className="sign-up-container">
      <h2>Dont't have an account</h2>
      <span>Sign up with your Email and Password</span>
      <form
        onSubmit={handleSubmit}
      >
        <FormInput label="DisplayName" type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required/>
        <FormInput label="Email" type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required/>
        <FormInput label="Password" type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required/>
        <FormInput label="Confirm Password"  type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required/>
        
        <Button children='Submit' type="submit" buttonType="google-sign-in"/>
      </form>
    </div>
  );
};
export default SignUpForm;

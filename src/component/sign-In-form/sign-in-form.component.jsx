import { useState } from "react";
import {
  createUserDocFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../util/firebase/firebaseutil";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import { useContext } from "react";
import { UserContest } from "../context/user.context";
const SignInForm = () => {
  const defaultFormFeild = {
    email: "",
    password: "",
  };
  
  const [formField, setFormField] = useState(defaultFormFeild);
  const { email, password } = formField;
  
  const signInWithGoogle=async()=>{
    let {user}= await signInWithGooglePopup()
//    let userDocRef=await createUserDocFromAuth(user)

}
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resetFormField = () => {
      setFormField(defaultFormFeild);
    };
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      const userDocRef = await createUserDocFromAuth(user);
      resetFormField();
    } catch (error) {
        switch(error.code){
            case "auth/wrong-password":
            alert("Incorrect Password for email")
            break
            case "auth/user-not-found":
            alert("No user Assosiated with this email")
            break
        }
    }
  };
  
  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className="buttons-container">
          <Button children="Submit" type="submit" buttonType="inverted" />
          <Button children="Google" type="button" buttonType="google" onClick={signInWithGoogle} />
        </div>
      </form>
    </div>
  );
};
export default SignInForm;

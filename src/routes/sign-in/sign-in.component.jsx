import SignUpForm from "../../component/sign-up-form/sign-up-form.component"
import { createUserDocFromAuth, signInWithGooglePopup } from "../../util/firebase/firebaseutil"
const SignIn=()=>{
    const logGoogleUser=async()=>{
        
        let {user}= await signInWithGooglePopup()
        let userDocRef=await createUserDocFromAuth(user)
        
    }
    return (
        <div>
            <h2>Sign-In with Google Account</h2>
            <button onClick={logGoogleUser}>Click to Sign in</button>
            <SignUpForm/>
        </div>
    )
}
export default SignIn
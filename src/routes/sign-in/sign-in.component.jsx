import { createUserDocFromAuth, signInWithGooglePopup } from "../../util/firebase/firebaseutil"
const SignIn=()=>{
    const logGoogleUser=async()=>{
        
        let {user}= await signInWithGooglePopup()
        let userDocRef=await createUserDocFromAuth(user)
        
    }
    return (
        <div>
            Hello
            <button onClick={logGoogleUser}>Click to Sign in</button>
        </div>
    )
}
export default SignIn
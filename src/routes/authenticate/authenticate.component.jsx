import SignInForm from "../../component/sign-In-form/sign-in-form.component"
import SignUpForm from "../../component/sign-up-form/sign-up-form.component"
import './authenticate.styles.scss'
const Authenticate=()=>{
    
    return (
        <div className="authenticate-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}
export default Authenticate
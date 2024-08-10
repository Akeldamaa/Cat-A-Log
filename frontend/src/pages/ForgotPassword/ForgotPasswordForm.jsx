import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import "./ForgotPassword.css"

export default function ForgotPasswordForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="forgotPassword-form">
            <div className="forgotpassword-fields">
                <label htmlFor="email" className="forgotpassword-label">
                    Email
                </label>
                <input {...register("email", {required: true})}
                    id="email"
                    className="login-input"
                    placeholder="Email"
                />
                <div className="login-footer">
                    <a href="login" className="login-link">Back to Login</a>
                    <a href="signup" className="signup-section">Create an Account</a>
                </div>
                <div className="forgotpassword-button">
                    <input type="submit" className="forgotPassword-submit" value="Send Reset Link"></input>
                </div>
            </div>
        </form>
    )
}
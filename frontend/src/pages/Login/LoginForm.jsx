import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import "./Login.css"

export default function LoginForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="login-fields">
                <label htmlFor="username" className="login-label">
                    Username
                </label>
                <input {...register("username", {required: true, maxLength: 30})}
                    id="username"
                    className="login-input"
                    placeholder="Username"
                />
                <label htmlFor="password" className="login-label">
                    Password
                </label>
                <input {...register("password", {required: true, maxLength: 30})}
                    id="password"
                    className="login-input"
                    placeholder="Password"
                />
                <div className="login-footer">
                    <a href="forgot-password" className="forgot-password">Forgot Password?</a>
                    <a href="signup" className="signup-section">Create an Account</a>
                </div>
                <div className="login-button">
                    <input type="submit" className="login-submit" value="Login!"></input>
                </div>
            </div>
        </form>
    )
}
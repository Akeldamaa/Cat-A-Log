import { useForm } from "react-hook-form";
import "./Signup.css"

export default function SignupForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        let validInput = true;
        if (data.password != data.confirmPassword){
            validInput = false;
            alert("Passwords do not match, please correct password.");
        }
        if (validInput == true){
            alert(JSON.stringify(data))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="login-fields">
                <label htmlFor="name" className="login-label">
                    Name
                </label>
                <input {...register("name", {required: true, maxLength: 30})}
                    id="name"
                    className="login-input"
                    placeholder="Name"
                />
                <label htmlFor="username" className="login-label">
                    Username
                </label>
                <input {...register("username", {required: true, maxLength: 30})}
                    id="username"
                    className="login-input"
                    placeholder="Username"
                />
                <label htmlFor="email" className="login-label">
                    Email
                </label>
                <input {...register("email", {required: true})}
                    id="email"
                    className="login-input"
                    placeholder="Email"
                />
                <label htmlFor="password" className="login-label">
                    Password
                </label>
                <input {...register("password", {required: true, maxLength: 30})}
                    id="password"
                    className="login-input"
                    placeholder="Password"
                />
                <label htmlFor="confirmPassword" className="login-label">
                    Confirm Password
                </label>
                <input {...register("confirmPassword", {required: true, maxLength: 30})}
                    id="confirmPassword"
                    className="login-input"
                    placeholder="Confirm Password"
                />
                <div className="signup-footer">
                    <a href="/login" className="login-link">Already a member?</a>
                </div>
                <div className="signup-button">
                    <input type="submit" className="signup-submit" value="Sign up!"></input>
                </div>
            </div>
        </form >
    )
}
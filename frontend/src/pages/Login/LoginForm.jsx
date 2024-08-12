import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        username: yup.string().required("Username cannot be blank."),
        password: yup.string().required("Password cannot be blank.")
    })
    .required()

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const [errorOrSuccess, setSuccess] = useState({
        success: false,
        error: false,
        neutral: false
    });


    const onSubmit = (data) => {
        let validInput = true;
        //Validate if login information is valid
        if (validInput == true){
            setSuccess({success: true, error: false, neutral: false})
            alert(JSON.stringify(data))
            //Redirect to user dashboard
        }
        if (validInput == false){
            setSuccess({success: false, error: true, neutral: false})
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="login-fields">
                <div>
                    <label htmlFor="username" className="login-label">
                        Username
                    </label>
                    <input {...register("username")}
                        id="username"
                        className="login-input"
                        placeholder="Username"
                    />
                    <span className="error-msg">{errors.username?.message}</span>
                </div>
                <div>
                    <label htmlFor="password" className="login-label">
                        Password
                    </label>
                    <input {...register("password")}
                        id="password"
                        className="login-input"
                        placeholder="Password"
                    />
                    <span className="error-msg">{errors.password?.message}</span>
                </div>
                <div>
                    <span className="text-neutral">{errorOrSuccess.neutral && ""}</span>
                    <span className="text-success">{errorOrSuccess.success && "Successfully Logged in!"}</span>
                    <span className="text-error">{errorOrSuccess.error && "Invalid login information"}</span>
                </div>
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
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        email: yup.string()
            .email("Email must be valid.")
            .required("Email cannot be blank."),
    })
    .required()

export default function ForgotPasswordForm() {
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
        if (validInput == true) {
            alert(JSON.stringify(data))
            setSuccess({ success: true, error: false, neutral: false })
        }
        if (validInput == false) {
            setSuccess({ success: false, error: true, neutral: false })
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="forgotPassword-form">
            <div className="forgotpassword-fields">
                <div>
                    <label htmlFor="email" className="forgotpassword-label">
                        Email
                    </label>
                    <input {...register("email", { required: true })}
                        id="email"
                        className="login-input"
                        placeholder="Email"
                    />
                    <span className="error-msg">{errors.email?.message}</span>
                </div>
                
                <div>
                    <span className="text-neutral">{errorOrSuccess.neutral && ""}</span>
                    <span className="text-success">{errorOrSuccess.success && "Email has been sent!"}</span>
                    <span className="text-error">{errorOrSuccess.error && "Email not found."}</span>
                </div>

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
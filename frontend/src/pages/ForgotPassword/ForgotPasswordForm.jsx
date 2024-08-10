import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
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

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="forgotPassword-form">
            <div className="forgotpassword-fields">
                <div>
                <label htmlFor="email" className="forgotpassword-label">
                    Email
                </label>
                <input {...register("email", {required: true})}
                    id="email"
                    className="login-input"
                    placeholder="Email"
                />
                <span className="error-msg">{errors.email?.message}</span>
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
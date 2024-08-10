import { useForm } from "react-hook-form";
import "./Signup.css"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        name: yup.string().max(12, "Name cannot exceed 30 characters.").required("Name cannot be blank."),
        email: yup.string().email("Must be a valid email.").required("Email cannot be blank."),
        username: yup.string().required("Username cannot be blank."),
        password: yup.string().required("Password cannot be blank."),
        confirmPassword: yup.string().required("Confirm Password cannot be blank."),
    })
    .required()

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        let validInput = true;
        if (data.password != data.confirmPassword) {
            validInput = false;
            alert("Passwords do not match, please correct password.");
        }
        if (validInput == true) {
            alert(JSON.stringify(data))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="login-fields">
                <div>
                    <label htmlFor="name" className="login-label">
                        Name
                    </label>
                    <input {...register("name")}
                        id="name"
                        className="login-input"
                        placeholder="Name"
                    />
                    <span className="error-msg">{errors.name?.message}</span>
                </div>
                <div>
                    <label htmlFor="email" className="login-label">
                        Email
                    </label>
                    <input {...register("email")}
                        id="email"
                        className="login-input"
                        placeholder="Email"
                    />
                    <span className="error-msg">{errors.email?.message}</span>
                </div>
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
                    <label htmlFor="confirmPassword" className="login-label">
                        Confirm Password
                    </label>
                    <input {...register("confirmPassword")}
                        id="confirmPassword"
                        className="login-input"
                        placeholder="Confirm Password"
                    />
                    <span className="error-msg">{errors.confirmPassword?.message}</span>
                </div>
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
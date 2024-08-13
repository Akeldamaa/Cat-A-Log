import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Signup.css"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref } from "yup";

const schema = yup
    .object({
        name: yup.string()
            .required("Name cannot be blank.")
            .matches(/^[A-Za-z.\s_-]+$/, "Can only be A-Z characters")
            .min(3, "Name must be atleast 3 characters.")
            .max(30, "Name cannot exceed 30 characters."),
        email: yup.string()
            .required("Email cannot be blank.")
            .email("Must be a valid email."),
        username: yup.string()
            .required("Username cannot be blank.")
            .min(8, "Username must be atleast 8 characters.")
            .max(30, "Username cannot exceed 30 characters."),
        password: yup.string()
            .required("Password cannot be blank.")
            .min(8, "Password must be astleast 8 characters long.")
            .max(30, "Password cannot exceed 30 characters."),
        confirmPassword: yup.string()
            .required("Confirm Password cannot be blank.")
            .oneOf([ref("password")], "Passwords does not match"),
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

    const [errorOrSuccess, setSuccess] = useState({
        success: false
    });

    const onSubmit = (data) => {
        let validInput = true;
        if (data.password != data.confirmPassword) {
            validInput = false;
        }
        if (validInput == true) {
            setSuccess({success: true})
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
                <div>
                    <span className="text-success">{errorOrSuccess.success && "Account Successfully Created!"}</span>
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
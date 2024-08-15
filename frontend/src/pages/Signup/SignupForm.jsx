import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref } from "yup";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("First Name cannot be blank.")
      .matches(/^[A-Za-z.\s_-]+$/, "Can only be A-Z characters")
      .min(3, "First Name must be at least 3 characters.")
      .max(30, "First Name cannot exceed 30 characters."),
    lastName: yup
      .string()
      .required("Last Name cannot be blank.")
      .matches(/^[A-Za-z.\s_-]+$/, "Can only be A-Z characters")
      .min(3, "Last Name must be at least 3 characters.")
      .max(30, "Last Name cannot exceed 30 characters."),
    email: yup
      .string()
      .required("Email cannot be blank.")
      .email("Must be a valid email."),
    password: yup
      .string()
      .required("Password cannot be blank.")
      .min(8, "Password must be at least 8 characters long.")
      .max(30, "Password cannot exceed 30 characters."),
    confirmPassword: yup
      .string()
      .required("Confirm Password cannot be blank.")
      .oneOf([ref("password")], "Passwords does not match"),
  })
  .required();

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorOrSuccess, setSuccess] = useState({
    success: false,
  });

  const onSubmit = (data) => {
    let validInput = true;
    if (data.password != data.confirmPassword) {
      validInput = false;
    }
    if (validInput == true) {
      setSuccess({ success: true });
      alert(JSON.stringify(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <div className="signup-fields">
        <div className="signup-blocks">
          <label htmlFor="firstName" className="signup-label">
            First Name
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            className="signup-input"
            placeholder="First Name"
          />
          <span className="error-msg">{errors.firstName?.message}</span>
        </div>

        <div className="signup-blocks">
          <label htmlFor="last" className="signup-label">
            Last Name
          </label>
          <input
            {...register("last")}
            id="last"
            className="signup-input"
            placeholder="Last Name"
          />
          <span className="error-msg">{errors.firstName?.message}</span>
        </div>

        <div className="signup-blocks">
          <label htmlFor="email" className="signup-label">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            className="signup-input"
            placeholder="Email"
          />
          <span className="error-msg">{errors.email?.message}</span>
        </div>

        <div className="signup-blocks">
          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="signup-input"
            placeholder="Password"
          />
          <span className="error-msg">{errors.password?.message}</span>
        </div>

        <div className="signup-blocks">
          <label htmlFor="confirmPassword" className="signup-label">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="signup-input"
            placeholder="Confirm Password"
          />
          <span className="error-msg">{errors.confirmPassword?.message}</span>
        </div>

        <div>
          <span className="text-success">
            {errorOrSuccess.success && "Account Successfully Created!"}
          </span>
        </div>

        <div className="signup-footer">
          <Link to="/login" className="login-link">
            Already a member? Log in
          </Link>
        </div>
        <div className="signup-button">
          <input
            type="submit"
            className="signup-submit"
            value="Sign up!"
          ></input>
        </div>
      </div>
    </form>
  );
}

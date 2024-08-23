import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().required("Email cannot be blank."),
    password: yup.string().required("Password cannot be blank."),
  })
  .required();

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorOrSuccess, setSuccess] = useState({
    success: false,
    error: false,
    errorMessage: "",
    neutral: false,
  });

  const onSubmit = (data) => {
    //Send login information to backend
    axios
      .post("/api/auth/login/", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        // console.log(response);
        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        setSuccess({
          success: true,
          neutral: false,
          errorMessage: "",
          error: false,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.data?.detail === "Email or password is incorrect.") {
          setSuccess({
            success: false,
            error: true,
            errorMessage: "Invalid login information",
            neutral: false,
          });
        } else {
          setSuccess({
            success: false,
            error: true,
            errorMessage: "An error occurred. Please try again later.",
            neutral: false,
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="login-fields">
        <div className="login-blocks">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            className="login-input"
            placeholder="Email"
          />
          <span className="error-msg">{errors.email?.message}</span>
        </div>

        <div className="login-blocks">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            className="login-input"
            placeholder="Password"
            type="password"
          />
          <span className="error-msg">{errors.password?.message}</span>
        </div>

        <div className="error-or-success">
          <span className="text-neutral">{errorOrSuccess.neutral && ""}</span>
          <span className="text-success">
            {errorOrSuccess.success && "Successfully Logged in!"}
          </span>
          <span className="text-error">
            {errorOrSuccess.error &&
              (errorOrSuccess.errorMessage ||
                "An error occurred. Please try again later.")}
          </span>
        </div>

        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>

          <Link to="/signup" className="signup-section">
            Create an Account
          </Link>
        </div>

        <div className="login-button">
          <input type="submit" className="login-submit" value="Login!"></input>
        </div>
      </div>
    </form>
  );
}

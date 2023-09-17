import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const {userData, setUserData}=UserDetail()

  const { email, password } = userData;
  const [errorMessage, setErrorMessage] = useState({});

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin@123";

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "email is not valid";
    }

    if (!password.trim()) {
      validationErrors.password = "password is required!";
    } else if (password.length < 6) {
      validationErrors.password = "password should be at least 6 char";
    } else {
      if (email === adminEmail && password === adminPassword) {
        navigate("/admin");
      } else {
        if (email && password) {
          
          var users = JSON.parse(localStorage.getItem("users") || "[]");
          const getUser = users?.find((item) => email === item?.email);
          if (!getUser) {
            users.push(userData);
            localStorage.setItem("users", JSON.stringify(users));
          }
          navigate("/user");
        } else {
          navigate("/");
        }
      }
    }

    setErrorMessage(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <h1>Login Form</h1>

        <div className="input-constainer">
          <label htmlFor="Email Address">Email Address</label>
          <input
            value={email}
            id="Email Address"
            name="email"
            placeholder="user@gmail.com"
            className="input-feild"
            onChange={handleChange}
          />
          {errorMessage.email && <span>{errorMessage.email}</span>}

          <label htmlFor="Password">Password</label>
          <input
            value={password}
            id="Password"
            name="password"
            placeholder="******"
            className="input-feild"
            onChange={handleChange}
          />
          {errorMessage.password && <span>{errorMessage.password}</span>}
        </div>
        <div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;

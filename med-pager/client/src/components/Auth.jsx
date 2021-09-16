import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import SignInImage from "../assets/1282794.jpeg";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarUrl: "",
};

const Auth = () => {
  const [isSignUp, setisSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const onSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:4000/auth";
    const { username, password, phoneNumber, avatarUrl } = formData;

    const {
      data: { token, userID, hashedPW, fullName },
    } = await axios.post(`${url}/${isSignUp ? "register" : "login"}`, {
      username,
      password,
      fullName: formData.fullName,
      phoneNumber,
      avatarUrl,
    });


    // set all data from backend into cookies
    cookies.set("token", token);
    cookies.set("username", username);
    // cookies.set('password', hashedPW)
    cookies.set("fullName", fullName);
    cookies.set("userID", userID);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarUrl", avatarUrl);
      cookies.set("hashedPW", hashedPW);
    }

    window.location.reload();
  };

  const testAccount = async (e) => {
    e.preventDefault();

    const url = "http://localhost:4000/auth";

    const testAccounts = ['jsonkale', 'drbais', 'drkasik', 'drdias', 'nursebrown']
    const username = testAccounts[Math.floor(Math.random() * testAccounts.length)]
    const password = 'hellome'

    const {
      data: { token, userID, fullName },
    } = await axios.post(`${url}/login`, {
      username,
      password,
    });

    // set all data from backend into cookies
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userID", userID);

    window.location.reload();    
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // console.log(formData);
  };

  const switchForms = () => {
    // setisSignUp(!isSignUp); IMPROPER

    setisSignUp((prevState) => !prevState);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Log In"}</p>
          <form onSubmit={onSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={onChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="fullName">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={onChange}
                required
              />
            </div>

            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={onChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="AvatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarUrl"
                  placeholder="Avatar URL"
                  onChange={onChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={onChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button type="submit">{isSignUp ? "Register" : "Log In"}</button>
            </div>
            <div className="auth__form-container_fields-content_button">
              <button onClick={testAccount}>Log In with test account</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already have an account? "
                : "Dont have an account? "}
              <span onClick={switchForms}>
                {isSignUp ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={SignInImage} alt="Log In" />
      </div>
    </div>
  );
};

export default Auth;

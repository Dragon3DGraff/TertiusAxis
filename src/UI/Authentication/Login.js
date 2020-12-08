import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import logo from "../../_Resources/Logo/logo5.jpg";
import { TA_State } from "../../TA_State.js";
import { Http } from "../../Http.js";

let ta_State = new TA_State();
const http = new Http(ta_State);

export default function Login({ history, hide }) {
  const passwordRef = useRef();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    hide(false);
    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      onCloseForm();
    }
  };

  const hideForm = () => {
    hide(true);
    history.push("/");
  };

  const onCloseForm = () => {
    hideForm();
  };

  const onRegister = (e) => {
    history.push("/registration");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const answer = await http.login({ ...form });
    passwordRef.current.value = "";
    if (answer && answer.userName) {
      hideForm();
    } else {
      setErrorMessage("No connection");
    }
  };

  return (
    <div className="Login-div" onClick={onCloseForm}>
      <div className="registration-form">
        <div className="registration-form-header">
          <img src={logo} alt="Logo" />
          <div className="registration-form-title">
            <h1>Login</h1>
            {errorMessage && (
              <p className="registration-form-error">Error: {errorMessage}</p>
            )}
          </div>
          <button className="registration-close" onClick={onCloseForm}>
            x
          </button>
        </div>
        <form className="registration-form-inputs">
          <input
            placeholder="Email"
            name="email"
            onChange={onInputChange}
          ></input>
          <input
            ref={passwordRef}
            placeholder="Password"
            name="password"
            type="password"
            onChange={onInputChange}
          ></input>

          <div className="registration-form-buttons">
            <button
              className="registration-form-IHaveLogin"
              onClick={onRegister}
            >
              I have no login
            </button>
            <button
              className="registration-form-register"
              type="submit"
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

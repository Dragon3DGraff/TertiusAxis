import React, { useEffect, useRef, useState } from "react";
import "./Registration.css";
import logo from "../../_Resources/Logo/logo5.jpg";
import { TA_State } from "../../TA_State.js";
import { Http } from "../../Http.js";

let ta_State = new TA_State();
const http = new Http(ta_State);

export default function Registration({ history, hide }) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successRegister, setSuccessRegister] = useState(false);

  useEffect(() => {
    hide(false);
    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      onCloseForm();
    }
  };

  const onCloseForm = () => {
    hide(true);
    history.push("/");
  };

  const onInputChange = (e) => {
    setErrorMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      confirmPasswordRef.current.value = "";
      setErrorMessage("Please confirm your password");
      return;
    }
    const answer = await http.register({ ...form });
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    if (answer === 201) {
      setSuccessRegister(true);
    } else {
      setErrorMessage(answer);
    }
  };

  const onLogin = () => {
    history.push("/login");
  };

  return (
    <div className="registration-div" onClick={onCloseForm}>
      {successRegister ? (
        <div className="registration-form-congrat">
          <div className="congrat-text">
            Congratulations! <br></br>
            You have registered on TertiusAxis editor!
          </div>
          <button className="registration-form-register" onClick={onLogin}>
            Ok
          </button>
        </div>
      ) : (
        <div className="registration-form">
          <div className="registration-form-header">
            <img src={logo} alt="Logo" />
            <div className="registration-form-title">
              <h1>Registration</h1>
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
              placeholder="Name"
              name="name"
              onChange={onInputChange}
            ></input>
            <input
              placeholder="Email"
              name="email"
              onChange={onInputChange}
            ></input>
            <input
              ref={passwordRef}
              placeholder="Password not less 6 symbols"
              name="password"
              type="password"
              onChange={onInputChange}
            ></input>
            <input
              ref={confirmPasswordRef}
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              onChange={onInputChange}
            ></input>

            <div className="registration-form-buttons">
              <button
                className="registration-form-IHaveLogin"
                onClick={onLogin}
              >
                I have login
              </button>
              <button
                className="registration-form-register"
                type="submit"
                onClick={onSubmit}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../state/authSlice";
import { useLoginMutation, useRegisterMutation } from "../state/authApi";
import * as Yup from "yup";

export default function AuthForm({ mode = "login" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const isRegister = mode === "register";

  // Validation schema
  const schema = Yup.object().shape({
    name: isRegister
      ? Yup.string().min(2, "Too short").required("Name is required")
      : Yup.string().strip(true),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setApiError(null);

    try {
      await schema.validate(formData, { abortEarly: false });
      setIsLoading(true);

      const endpoint = isRegister ? register : login;
      const { user, token } = await endpoint(formData).unwrap();
      dispatch(setCredentials({ user, token }));

      // redirect to playlists page
      navigate("/listen/playlists");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((e) => (errors[e.path] = e.message));
        setFormErrors(errors);
      } else {
        setApiError(err?.data?.error || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    navigate(isRegister ? "/login" : "/register");
  };

  return (
    <div className="auth-page">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </label>

        <button type="submit" disabled={isLoading}>
          {isRegister ? "Register" : "Login"}
        </button>
        {apiError && <p className="error">{apiError}</p>}
      </form>

      <p className="switch-mode">
        {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button type="button" onClick={switchMode} className="link-btn">
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

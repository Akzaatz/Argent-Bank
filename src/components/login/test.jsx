import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsync,
  setRememberMe,
  selectUserStatus,
  selectUserError,
} from "../../redux/userSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (status !== "loading" && error) {
      const timer = setTimeout(() => {
        // dispatch(clearError()); // Assurez-vous d'ajouter une action clearError dans userSlice si nécessaire
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, error, dispatch]);

  const handleRememberMeChange = (e) => {
    const value = e.target.checked;
    setRemember(value);
    localStorage.setItem("rememberMe", JSON.stringify(value));
    dispatch(setRememberMe(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ name, password }));
  };

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={remember}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button
              type="submit"
              className="sign-in-button"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>
      </main>
    </div>
  );
};

export default Login;

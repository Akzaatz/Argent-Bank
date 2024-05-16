import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsync,
  selectUserStatus,
  selectUserError,
} from "../../redux/userSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

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
              <input type="checkbox" id="remember-me" />
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

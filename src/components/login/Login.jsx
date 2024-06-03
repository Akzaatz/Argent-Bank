import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginThunk,
  setRememberMe,
  getUserInfoThunk,
  selectUserStatus,
  selectUserError,
} from "../../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const [remember, setRemember] = useState(false);
  const error = useSelector(selectUserError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(resultAction)) {
      const token = resultAction.payload.body.token;
      localStorage.setItem("token", token);
      dispatch(getUserInfoThunk(token));
    }
  };
  const handleRememberMeChange = (e) => {
    const value = e.target.checked;
    setRemember(value);
    localStorage.setItem("rememberMe", JSON.stringify(value));
    dispatch(setRememberMe(value));
  };
  return (
    <main className="main bg-dark">
      <div className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
            className="sign-in-button"
            type="submit"
            disabled={status === "loading"}
          >
            Sign In
          </button>
        </form>
        {status === "failed" && <div className="error">{error}</div>}
      </div>
    </main>
  );
};

export default Login;

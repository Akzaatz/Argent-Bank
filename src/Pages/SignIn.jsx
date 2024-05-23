import React from "react";
import Login from "../components/login/Login";
import { useSelector } from "react-redux";
import { selectLogged } from "../redux/userSlice";
import User from "./User";

const SignIn = () => {
  const logged = useSelector(selectLogged);
  return <div>{logged ? <User /> : <Login />}</div>;
};

export default SignIn;

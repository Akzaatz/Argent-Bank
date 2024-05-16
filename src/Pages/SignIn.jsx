import React from "react";
import Login from "../components/login/Login";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import User from "./User";

const SignIn = () => {
  const user = useSelector(selectUser);
  return <div>{user ? <User /> : <Login />}</div>;
};

export default SignIn;

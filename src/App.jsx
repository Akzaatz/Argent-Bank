import React, { useSelector } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Pages";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./Pages/SignIn";
import User from "./Pages/User";
import { selectUser } from "./redux/userSlice";
import Login from "./components/login/Login";

const App = () => {
  const basename = import.meta.env.MODE === "production" ? "/Argent-Bank" : "";

  return (
    <BrowserRouter basename={basename}>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

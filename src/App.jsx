import React, { useSelector } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./components/error/Error";
import Index from "./Pages/Index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./Pages/SignIn";
import User from "./Pages/User";

const App = () => {
  const basename = import.meta.env.MODE === "production" ? "/Argent-Bank" : "";

  return (
    <BrowserRouter basename={basename}>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

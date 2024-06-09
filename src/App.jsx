import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Index from "./Pages/Index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./Pages/SignIn";
import User from "./Pages/User";
import PrivateRoute from "./utils/PrivateRoute";
import Error from "./components/error/Error";
import { selectLogged } from "./redux/userSlice";
import { useSelector } from "react-redux";

const App = () => {
  const logged = useSelector(selectLogged);
  const basename = import.meta.env.MODE === "production" ? "/Argent-Bank" : "";

  return (
    <BrowserRouter basename={basename}>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/signin"
          element={logged ? <Navigate replace to="/user" /> : <SignIn />}
        />
        <Route
          path="/user"
          element={
            !logged ? (
              <Navigate replace to="/signin" />
            ) : (
              <PrivateRoute>
                <User />
              </PrivateRoute>
            )
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

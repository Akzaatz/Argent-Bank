import React from "react";
import logo from "../../assets/img/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, logout, selectUser } from "../../redux/userSlice";

const Nav = () => {
  const logged = useSelector(selectLogged);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img src={logo} alt="logo de la banque en ligne ArgentBank" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {logged ? (
          <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
            <i className="fa fa-user-circle"></i>
            {user && user.userName}
            <i class="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        ) : (
          <NavLink className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Nav;

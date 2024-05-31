import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectLogged } from "../redux/userSlice";

const PrivateRoute = ({ children }) => {
  const logged = useSelector(selectLogged);
  return logged ? children : <Navigate to="/signin" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;

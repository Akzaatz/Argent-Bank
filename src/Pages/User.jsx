import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";
import EditName from "../components/EditName/EditName";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user && `${user.userName} ${user.lastName}`}
        </h1>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        ) : (
          <EditName onCancel={handleCancelClick} />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>

      <div className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </div>
      <div className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </div>
      <div className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </div>
    </main>
  );
};

export default User;

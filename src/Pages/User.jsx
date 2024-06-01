import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";
import EditName from "../components/EditName/EditName";
import Accounts from "../components/accounts/Accounts";
import accountsData from "../assets/data/accounts.json";
import "../Pages/user.scss";

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

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="user-page">
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
            <EditName onSave={handleSave} onCancel={handleCancelClick} />
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accountsData.Accounts.map((account) => (
          <Accounts
            key={account.ref}
            title={account.title}
            amount={account.amount}
            balanceStatus={account.balanceStatus}
          />
        ))}
      </div>
    </main>
  );
};

export default User;

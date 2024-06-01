import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserNameThunk,
  selectUser,
  // selectToken,
} from "../../redux/userSlice";

const EditName = ({ onSave, onCancel }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = localStorage.getItem("token");
  const [newUserName, setNewUserName] = useState(user ? user.userName : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserNameThunk({ token, newUserName })).unwrap();
      console.log("Le nom d'utilisateur a bien été modifié.");
      onSave();
    } catch (error) {
      console.error("La mise à jour du nom d'utilisateur a échoué:", error);
    }
  };

  return (
    <section className="edit-card">
      <div className="edit-card-content">
        <h1>Edit user info</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-pseudo">
            <label htmlFor="userName">User Name: </label>
            <input
              type="text"
              id="userName"
              value={newUserName}
              placeholder={user ? user.userName : ""}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
          <div className="input-firstname">
            <label htmlFor="firstname">First name: </label>
            <input
              type="text"
              name="firstname"
              placeholder={user ? user.firstName : ""}
              readOnly
            />
          </div>
          <div className="input-lastname">
            <label htmlFor="lastname">Last name: </label>
            <input
              type="text"
              name="lastname"
              placeholder={user ? user.lastName : ""}
              readOnly
            />
          </div>
          <div>
            <button className="edit-button" type="submit">
              Save
            </button>
            <button className="edit-button" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditName;

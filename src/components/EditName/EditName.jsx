import React from "react";

const EditName = () => {
  return (
    <section className="edit-card">
      <div className="edit-card-content">
        <h1>Edit user info</h1>
        <div className="input-pseudo">
          <label htmlFor="username">User name: </label>
          <input type="text" name="username" />
        </div>{" "}
        <div className="input-firstname">
          <label htmlFor="firstname">First name: </label>
          <input type="text" name="firstname" />
        </div>
        <div className="input-lastname">
          <label htmlFor="lastname">Last name: </label>
          <input type="text" name="lasname" />
        </div>
        <div>
          <button className="edit-button">Save</button>
          <button className="edit-button">Cancel</button>
        </div>
      </div>
    </section>
  );
};

export default EditName;

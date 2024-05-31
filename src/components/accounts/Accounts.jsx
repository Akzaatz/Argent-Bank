import React from "react";
import PropTypes from "prop-types";

const Accounts = ({ title, amount, balanceStatus }) => {
  return (
    <main>
      <section className="account">
        <div className="account-content-wrapper">
          <h3>{title}</h3>
          <p>{amount}</p>
          <p>{balanceStatus}</p>
        </div>
        <div className="transactions-account-content-wrapper cta">
          <button className="transaction-button">View transaction</button>
        </div>
      </section>
    </main>
  );
};

Accounts.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  balanceStatus: PropTypes.string.isRequired,
};

export default Accounts;

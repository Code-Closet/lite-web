import "./Accounts.scss";
const AccountHome: React.FC = () => {
  return (
    <div className="account-container">
      <div className="account-load-action">
        <span className="header">Accounts</span>
      </div>
      <div className="search-bar">
        <input type="number" placeholder="Phone Number" />
        <input type="text" placeholder="Name" />
        <input type="number" placeholder="Account" />
        <button type="button">
          <i className="bx bx-search">Search</i>
        </button>
      </div>

      <div className="account-summary-table">Accounts</div>

      <div className="account-action-control">
        <button type="button">
          <i className="bx bxs-user-account"></i>
          Add
        </button>
        <button type="button">
          <i className="bx bx-upload"></i>
          Bulk Add
        </button>
      </div>
    </div>
  );
};

export default AccountHome;

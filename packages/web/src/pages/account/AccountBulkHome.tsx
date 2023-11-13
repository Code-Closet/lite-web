import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Accounts.scss";
//import AccountsBulkLoadTable from "../../components/table/AccountsBulkLoadTable";
import { AccountLoad } from "../../model/account/types";
//import AccountsLoadDetailsTable from "../../components/table/AccountsLoadDetailsTable";
import AccountsBulkLoadTable1 from "../../components/table/AccountBulkLoadTable1";
import AccountsLoadDetailsTable1 from "../../components/table/AccountsLoadDetailsTable1";

const AccountBulkHome: React.FC = () => {
  const navigate = useNavigate();
  const [isSummaryView, setIsSummaryView] = useState<boolean>(true);
  const [selectedBatch, setSelectedBatch] = useState<AccountLoad>();

  const handleWalletClick = () => {
    navigate("/transactions/wallet");
  };
  return (
    <div className="account-container">
      <div className="account-load-action">
        <span className="header">Account Bulk Load</span>
        <button
          className="account-button"
          type="button"
          onClick={handleWalletClick}
        >
          <i className="bx bx-wallet"></i>
          Wallet
        </button>
      </div>
      <div className={`account-summary ${!isSummaryView ? "slide-left" : ""}`}>
        <AccountsBulkLoadTable1
          setIsSummaryView={setIsSummaryView}
          setSelectedBatch={setSelectedBatch}
        />
      </div>
      <div
        className={`account-bulk-details ${
          !isSummaryView ? "slide-right" : ""
        }`}
      >
        {selectedBatch && <AccountsLoadDetailsTable1 account={selectedBatch} />}
        <button
          className="account-button"
          type="button"
          onClick={() => setIsSummaryView((prev) => !prev)}
        >
          <i className="bx bx-arrow-back"></i>
          Back
        </button>
      </div>
    </div>
  );
};

export default AccountBulkHome;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wallet.scss";
import WalletBulkLoadTable1 from "../../components/table/WalletBulkLoadTable";
import WalletLoadDetailsTable from "../../components/table/WalletLoadDetailsTable";
import { Batch } from "../../model/common-types";
const WalletHome: React.FC = () => {
  const navigate = useNavigate();
  const [isSummaryView, setIsSummaryView] = useState<boolean>(true);
  const [selectedBatch, setSelectedBatch] = useState<Batch>();

  const handleAccountClick = () => {
    navigate("/transactions/account");
  };
  return (
    <div className="wallet-container">
      <div className="wallet-load-action">
        <span className="header">Wallet Bulk Load</span>
        <button
          type="button"
          onClick={handleAccountClick}
          className="wallet-button"
        >
          <i className="bx bxs-user-account"></i>
          Accounts
        </button>
      </div>
      <div className={`wallet-summary ${!isSummaryView ? "slide-left" : ""}`}>
        <WalletBulkLoadTable1
          setIsSummaryView={setIsSummaryView}
          setSelectedBatch={setSelectedBatch}
        />
      </div>
      <div className={`wallet-details ${!isSummaryView ? "slide-right" : ""}`}>
        {selectedBatch && <WalletLoadDetailsTable wallet={selectedBatch} />}
        <button
          type="button"
          onClick={() => setIsSummaryView((prev) => !prev)}
          className="wallet-button"
        >
          <i className="bx bx-arrow-back"></i>
          Back
        </button>
      </div>
    </div>
  );
};

export default WalletHome;

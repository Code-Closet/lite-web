import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wallet.scss";
//import WalletBulkLoadTable from "../../components/table/WalletBulkLoadTable";
import { WalletLoad } from "../../model/wallet/types";
//import WalletLoadDetailsTable from "../../components/table/WalletLoadDetailsTable";
import WalletBulkLoadTable1 from "../../components/table/WalletBulkLoadTable1";
import WalletLoadDetailsTable1 from "../../components/table/WalletLoadDetailsTable1";
const WalletHome: React.FC = () => {
  const navigate = useNavigate();
  const [isSummaryView, setIsSummaryView] = useState<boolean>(true);
  const [selectedBatch, setSelectedBatch] = useState<WalletLoad>();

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
        {selectedBatch && <WalletLoadDetailsTable1 wallet={selectedBatch} />}
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

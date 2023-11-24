import { useNavigate } from "react-router-dom";
import "./Approval.scss";
import WalletApprovalTable from "../../components/table/WalletApprovalTable";

const WalletApproval: React.FC = () => {
  const navigate = useNavigate();
  const handleAccountClick = () => {
    navigate("/approvals/account");
  };
  return (
    <div className="approval-container">
      <div className="approval-load-action">
        <span className="header">Workflow Approvals</span>
        <button
          type="button"
          onClick={handleAccountClick}
          className="approval-button"
        >
          <i className="bx bxs-user-account"></i>
          Account Approval
        </button>
      </div>
      <div className="approval-summary">
        <WalletApprovalTable />
      </div>
    </div>
  );
};

export default WalletApproval;

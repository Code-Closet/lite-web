import { useNavigate } from "react-router-dom";
import "./Approval.scss";

const AccountApproval: React.FC = () => {
  const navigate = useNavigate();
  const handleWalletClick = () => {
    navigate("/approvals/wallet");
  };
  return (
    <div className="approval-container">
      <div className="approval-load-action">
        <span className="header">Account Approvals</span>
        <button
          type="button"
          onClick={handleWalletClick}
          className="approval-button"
        >
          <i className="bx bxs-user-account"></i>
          Wallet Approval
        </button>
      </div>
    </div>
  );
};

export default AccountApproval;

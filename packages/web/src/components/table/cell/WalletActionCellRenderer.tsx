import { ICellRendererParams } from "ag-grid-community";
import "./CustomCellRenderer.css";
import { Account } from "../../../model/account/types";

export interface ActionCellRendererParams extends ICellRendererParams {
  onLoadWallet: (account: Account) => void;
  onDeactivateWallet: (account: Account) => void;
}

const WalletActionCellRenderer = (props: ActionCellRendererParams) => {
  const handleWalletLoad = () => {
    props.onLoadWallet(props.data as Account);
  };

  const handleDeactivateWallet = () => {
    props.onDeactivateWallet(props.data as Account);
  };

  return (
    <div className="wallet-action-cell">
      <div className="wallet-detail-action-button" onClick={handleWalletLoad}>
        <i className="bx bx-credit-card"></i>
      </div>
      <div
        className="wallet-detail-action-button"
        onClick={handleDeactivateWallet}
      >
        <i className="bx bx-stop-circle"></i>
      </div>
    </div>
  );
};

export default WalletActionCellRenderer;

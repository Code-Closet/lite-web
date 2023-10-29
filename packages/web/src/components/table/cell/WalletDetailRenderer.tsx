import { ICellRendererParams } from "ag-grid-community";
import "./CustomCellRenderer.css";
import { WalletLoad } from "../../../model/wallet/types";

export interface ActionCellRendererParams extends ICellRendererParams {
  onClick: (wallet: WalletLoad) => void;
}

const WalletDetailRenderer = (props: ActionCellRendererParams) => {
  const handleWalletClick = () => {
    props.onClick(props.data as WalletLoad);
  };

  return (
    <div className="wallet-detail-action-button" onClick={handleWalletClick}>
      <i className="bx bxs-id-card"></i>
    </div>
  );
};

export default WalletDetailRenderer;

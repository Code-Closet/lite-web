import { ICellRendererParams } from "ag-grid-community";
import "./CustomCellRenderer.css";
import { AccountLoadPreview } from "../../../model/account/types";

export interface ValidationCellRendererParams {
  isValid: boolean;
  message: string;
}
const ValidationCellRenderer = (
  props: ICellRendererParams<AccountLoadPreview, ValidationCellRendererParams>
) => {
  const { isValid, message } = props.value || { isValid: false, message: "" };

  return (
    <div className="validation-cell">
      {isValid ? (
        <i className="bx bxs-check-circle success"></i>
      ) : (
        <i className="bx bxs-error error"></i>
      )}
      <span>{message}</span>
    </div>
  );
};

export default ValidationCellRenderer;

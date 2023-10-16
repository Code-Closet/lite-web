import { ICellRendererParams } from "ag-grid-community";
import "./CustomCellRenderer.css";
import { User } from "../../../api/admin/admin";

const cell_color: { [status: string]: string } = {
  "Not logged in": "orange",
  Active: "green",
  Inactive: "red",
};

const StatusCellRenderer = (props: ICellRendererParams<User, string>) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <div className="status-field">
      {cellValue && (
        <span style={{ color: cell_color[cellValue] }}>{cellValue}</span>
      )}
      &nbsp;
    </div>
  );
};

export default StatusCellRenderer;

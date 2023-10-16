import { ICellRendererParams } from "ag-grid-community";
import "./CustomCellRenderer.css";
import { User } from "../../../api/admin/admin";

const ActionCellRenderer = (props: ICellRendererParams<User, string>) => {
  const cellValue = props?.valueFormatted ? props.valueFormatted : props.value;

  const handleModifyUser = () => {
    console.log(`Modify User : ${cellValue}`);
  };

  const handleRemoveUser = () => {
    console.log(`Remove User : ${cellValue}`);
  };

  return (
    <div className="action-field">
      <div className="action-button" onClick={handleModifyUser}>
        <img src="./assets/admin/modify.svg" alt="modify" />
        <label htmlFor="modify" style={{ cursor: "pointer" }}>
          Modify User
        </label>
      </div>
      <div className="action-button" onClick={handleRemoveUser}>
        <img src="./assets/admin/delete.svg" alt="delete" />
        <label htmlFor="modify" style={{ cursor: "pointer" }}>
          Remove User
        </label>
      </div>
    </div>
  );
};

export default ActionCellRenderer;

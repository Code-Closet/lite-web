import { ICellRendererParams } from "ag-grid-community";
import "./CustomCellRenderer.css";
import { User } from "../../../api/admin/admin";

export interface ActionCellRendererParams extends ICellRendererParams {
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const ActionCellRenderer = (props: ActionCellRendererParams) => {
  //const cellValue = props?.valueFormatted ? props.valueFormatted : props.value;

  const handleModifyUser = () => {
    props.onEditUser(props.data as User);
  };

  const handleRemoveUser = () => {
    props.onDeleteUser(props.data as User);
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

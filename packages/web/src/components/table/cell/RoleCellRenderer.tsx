import { ICellRendererParams } from "ag-grid-community";
import "./CustomCellRenderer.css";
import { User } from "../../../api/admin/admin";

const role_color_map: { [role: string]: string } = {
  admin: "#56887d",
  customer: "#b4eeb4",
  agent: "#c8c7c1",
  maker: "#e4dfec",
  l1_approver: "#818f9a",
  l2_approver: "#6FA8DC",
};

const RoleCellRenderer = (props: ICellRendererParams<User, string>) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const RoleCell = () => {
    if (cellValue) {
      return (
        <div
          className="role-field"
          style={{
            backgroundColor: `${
              role_color_map[cellValue.toString().toLowerCase()]
            }`,
          }}
        >
          <div style={{ color: "#fff", marginInline: "auto" }}>{cellValue}</div>
        </div>
      );
    } else {
      return <div className="role-field"></div>;
    }
  };

  return <RoleCell />;
};

export default RoleCellRenderer;

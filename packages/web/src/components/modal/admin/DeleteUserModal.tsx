import { Fragment } from "react";
import { User } from "../../../api/admin/admin";
import "./DeleteUserModal.scss";

const DeleteUserModal: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Fragment>
      <div style={{ display: "grid", gap: 10 }}>
        <div className="delete-user-text">This will remove the user</div>
        <div className="name-field">
          <div>
            <span style={{ color: "rgb(0,48,51)", letterSpacing: "0.5px" }}>
              {user.name}
            </span>
          </div>
          <div className="email">
            <span style={{ color: "#818f9a" }}>{user.email}</span>&nbsp;
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteUserModal;

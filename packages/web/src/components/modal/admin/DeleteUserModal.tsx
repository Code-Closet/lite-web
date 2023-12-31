import { Fragment } from "react";
import "./DeleteUserModal.scss";
import { User } from "../../../model/user/types";

const DeleteUserModal: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Fragment>
      <div style={{ display: "grid", gap: 10 }}>
        <div className="delete-user-text">This will remove the user</div>
        <div className="name-field">
          <div>
            <span style={{ color: "rgb(0,48,51)", letterSpacing: "0.5px" }}>
              {`${user.firstName} ${user.lastName}`}
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

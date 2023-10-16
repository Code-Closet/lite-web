import "./DeleteUserModal.scss";

const DeleteUserModal: React.FC = () => {
  return (
    <div className="name-field">
      <div>
        <span style={{ color: "rgb(0,48,51)", letterSpacing: "0.5px" }}>
          {"Test"}
        </span>
        &nbsp;
      </div>
      <div className="email">
        <span style={{ color: "#818f9a" }}>{"test@domain.com"}</span>&nbsp;
      </div>
    </div>
  );
};

export default DeleteUserModal;

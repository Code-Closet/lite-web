import { User } from "../../../api/admin/admin";
import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import "./ModifyUserModal.scss";
import { useRef, useState } from "react";

interface ModifyUserModalProps {
  user: User;
  modifiedUser: User;
  roles: { value: string; label: string }[];
  setModifiedUser: (user: User) => void;
}
const Input = styled.input`
  color: #818b94;
  background-color: #fafafa;
  border: 1px solid #e7e9eb;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;
`;

const ModifyUserModal: React.FC<ModifyUserModalProps> = ({
  user,
  modifiedUser,
  roles,
  setModifiedUser,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [selectedRole, setSelectedRole] = useState<{
    value: string;
    label: string;
  }>(roles[0]);
  const handleRoleChange = (
    role: SingleValue<{ value: string; label: string }>
  ): void => {
    setSelectedRole(role as { value: string; label: string });
    setModifiedUser({ ...modifiedUser, userType: role?.value || "" });
  };
  const handleEmailChange = () => {
    setModifiedUser({ ...modifiedUser, email: emailRef.current!.value });
  };
  const handleNumberChange = () => {
    setModifiedUser({ ...modifiedUser, email: phoneRef.current!.value });
  };
  return (
    <div className="modify-user-container">
      <div className="modify-text-desc">
        <span className="label">Details</span>
        <span>Make sure you update the required field.</span>
      </div>
      <div className="modfiy-input-row">
        <div className="modify-input-field">
          <span>First Name</span>
          <Input type="text" defaultValue={user.firstName} />
        </div>
        <div className="modify-input-field">
          <span>Last Name</span>
          <Input type="text" defaultValue={user.lastName} />
        </div>
      </div>

      <div className="modfiy-input-row">
        <div className="modify-input-field">
          <span>Email</span>
          <Input
            type="text"
            defaultValue={user.email}
            ref={emailRef}
            onChange={handleEmailChange}
          />
        </div>

        <div className="modify-input-field">
          <span>Phone Number</span>
          <Input
            type="text"
            defaultValue={user.phoneNumber}
            ref={phoneRef}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      <div className="modify-text-desc">
        <span className="label">Role</span>
        <span>Choose the role from the selection box.</span>
      </div>

      <div className="modfiy-input-row">
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="role"
          defaultValue={selectedRole}
          options={roles}
          onChange={handleRoleChange}
        />
      </div>
    </div>
  );
};

export default ModifyUserModal;

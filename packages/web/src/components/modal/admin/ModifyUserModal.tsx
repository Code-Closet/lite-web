import { User } from "../../../api/admin/admin";
import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import "./ModifyUserModal.scss";
import { useRef, useState } from "react";

interface ModifyUserModalProps {
  user: User;
  modifiedUser: User | undefined;
  roles: { value: string; label: string }[];
  setModifiedUser: (user: User) => any;
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
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
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
    setModifiedUser({ ...modifiedUser, userType: role?.value || "" } as User);
  };

  const onChangeInput = () => {
    const newUser: User = {
      ...user,
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      email: emailRef.current?.value || "",
      phoneNumber: phoneRef.current?.value || "",
      username: phoneRef.current?.value || "",
    };
    setModifiedUser(newUser);
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
          <Input
            type="text"
            defaultValue={user.firstName}
            ref={firstNameRef}
            onChange={onChangeInput}
          />
        </div>
        <div className="modify-input-field">
          <span>Last Name</span>
          <Input
            type="text"
            defaultValue={user.lastName}
            ref={lastNameRef}
            onChange={onChangeInput}
          />
        </div>
      </div>

      <div className="modfiy-input-row">
        <div className="modify-input-field">
          <span>Email</span>
          <Input
            type="text"
            defaultValue={user.email}
            ref={emailRef}
            onChange={onChangeInput}
          />
        </div>

        <div className="modify-input-field">
          <span>Phone Number</span>
          <Input
            type="text"
            defaultValue={user.phoneNumber}
            ref={phoneRef}
            onChange={onChangeInput}
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

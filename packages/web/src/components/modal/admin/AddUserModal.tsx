import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import "./AddUserModal.scss";
import { User } from "../../../api/admin/admin";
import { useRef, useState } from "react";

interface AddUserModalProp {
  user: User;
  setUser: (user: User) => void;
  roles: { value: string; label: string }[];
}
const Input = styled.input`
  color: #818b94;
  background-color: #fafafa;
  border: 1px solid #e7e9eb;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;
`;

const AddUserModal: React.FC<AddUserModalProp> = ({ user, setUser, roles }) => {
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
    setUser({ ...user, role: role?.value || "" });
  };
  const onChangeInput = () => {
    const newUser: User = {
      name: `${firstNameRef.current?.value || ""}.${
        lastNameRef.current?.value || ""
      }`,
      email: emailRef.current?.value || "",
      status: "Not logged in",
      role: selectedRole.value,
    };
    setUser(newUser);
  };

  return (
    <div className="add-user-container">
      <div className="add-text-desc">
        <span className="label">Details</span>
        <span>Make sure you update the required field.</span>
      </div>
      <div className="add-input-row">
        <div className="add-input-field">
          <span>First Name</span>
          <Input
            type="text"
            defaultValue=""
            ref={firstNameRef}
            onChange={onChangeInput}
          />
        </div>
        <div className="add-input-field">
          <span>Last Name</span>
          <Input
            type="text"
            defaultValue=""
            ref={lastNameRef}
            onChange={onChangeInput}
          />
        </div>
      </div>

      <div className="add-input-row">
        <div className="add-input-field">
          <span>Email</span>
          <Input
            type="text"
            defaultValue=""
            ref={emailRef}
            onChange={onChangeInput}
          />
        </div>
        <div className="add-input-field">
          <span>Phone Number</span>
          <Input type="number" ref={phoneRef} onChange={onChangeInput} />
        </div>
      </div>

      <div className="add-text-desc">
        <span className="label">Role</span>
        <span>Choose the role from the selection box.</span>
      </div>

      <div className="add-input-row">
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="role"
          defaultValue={roles[0]}
          options={roles}
          onChange={handleRoleChange}
        />
      </div>
    </div>
  );
};

export default AddUserModal;
import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import "./AddUserModal.scss";
import { useEffect, useRef, useState } from "react";
import { User } from "../../../model/user/types";

interface AddUserModalProp {
  user: User;
  setUser: (user: User) => void;
  roles: { value: string; label: string }[];
  setIsValidForm: (isValid: boolean) => void;
}
const Input = styled.input`
  color: #818b94;
  background-color: #fafafa;
  border: 1px solid #e7e9eb;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;
`;

const AddUserModal: React.FC<AddUserModalProp> = ({
  user,
  setUser,
  roles,
  setIsValidForm,
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
    setUser({ ...user, userType: role?.value || "" });
  };
  const onChangeInput = () => {
    const newUser: User = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      email: emailRef.current?.value || "",
      phoneNumber: `+${phoneRef.current?.value}` || "",
      status: "Not logged in",
      userType: selectedRole.value,
      financialEntityId: "",
      username: `+${phoneRef.current?.value}` || "",
    };
    setUser(newUser);
  };

  useEffect(() => {
    setIsValidForm(
      !!firstNameRef.current?.value &&
        !!lastNameRef.current?.value &&
        !!phoneRef.current?.value &&
        phoneRef.current?.value.length >= 12
    );
  }, [
    firstNameRef.current?.value,
    lastNameRef.current?.value,
    phoneRef.current?.value,
  ]);

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
          <Input
            type="number"
            ref={phoneRef}
            onChange={onChangeInput}
            placeholder="Should contains 12 numbers"
            minLength={12}
          />
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

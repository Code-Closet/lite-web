import { useRef } from "react";
import styled from "styled-components";
import Select from "react-select";

const Input = styled.input`
  color: #818b94;
  height: 2.5rem;
  background-color: #fafafa;
  border: 1px solid #e7e9eb;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;
`;

const AddAccountModal: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const onChangeInput = () => {
    console.log("newUser");
  };

  return (
    <div className="add-user-container">
      <div className="add-text-desc">
        <span className="label">Details</span>
        <span>Make sure you add all the required field.</span>
      </div>
      <div className="add-input-row">
        <div className="add-input-field">
          <span>
            First Name <sup>*</sup>
          </span>
          <Input
            type="text"
            defaultValue=""
            ref={firstNameRef}
            onChange={onChangeInput}
          />
        </div>
        <div className="add-input-field">
          <span>
            Last Name <sup>*</sup>
          </span>
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
          <span>
            Account Number <sup>*</sup>
          </span>
          <Input
            type="number"
            defaultValue=""
            ref={emailRef}
            onChange={onChangeInput}
          />
        </div>
        <div className="add-input-field">
          <span>
            Phone Number <sup>*</sup>
          </span>
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
          defaultValue={{ value: "sb", label: "Savings" }}
          options={[
            { value: "sb", label: "Savings" },
            { value: "current", label: "Current" },
            { value: "fd", label: "FD" },
          ]}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default AddAccountModal;

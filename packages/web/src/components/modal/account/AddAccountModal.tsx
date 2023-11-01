import { useRef, useState } from "react";
import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import { Account } from "../../../model/account/types";

const Input = styled.input`
  color: #818b94;
  height: 2.5rem;
  background-color: #fafafa;
  border: 1px solid #e7e9eb;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;
`;

const AddAccountModal: React.FC<{
  account: Account;
  setAccount: (account: Account) => void;
}> = ({ account, setAccount }) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const accountNumberRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [selectedAccountType, setSelectedAccountType] = useState<{
    value: string;
    label: string;
  }>();

  const onChangeInput = () => {
    const acc: Account = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      accountName: `${firstNameRef.current?.value || ""}.${
        lastNameRef.current?.value || ""
      }`,
      accountNumber: accountNumberRef.current?.value || "",
      phoneNumber: phoneRef.current?.value || "",
      accountType: selectedAccountType?.value || "",
      status: "Active",
    };
    setAccount(acc);
  };

  const handleRoleChange = (
    accType: SingleValue<{ value: string; label: string }>
  ): void => {
    setSelectedAccountType(accType as { value: string; label: string });
    setAccount({ ...account, accountType: accType?.value || "" });
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
            ref={accountNumberRef}
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
        <span className="label">Account Type</span>
        <span>Choose the account type from the selection box.</span>
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
          onChange={handleRoleChange}
        />
      </div>
    </div>
  );
};

export default AddAccountModal;

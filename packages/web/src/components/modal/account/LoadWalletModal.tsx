import styled from "styled-components";
import "./AccountModal.scss";
import { Account1 } from "../../../model/account/types";
const Input = styled.input`
  color: #818b94;
  height: 2.5rem;
  background-color: #fafafa;
  border: 1px solid #e7e9eb;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;
`;
const LoadWalletModal: React.FC<{ account: Account1 }> = ({ account }) => {
  return (
    <div className="add-account-container">
      <div className="add-input-row">
        <div className="add-input-field">
          <span>Wallet</span>
          <Input type="text" defaultValue="37246764123" disabled />
        </div>
        <div className="add-input-field">
          <span>Account</span>
          <Input type="text" defaultValue={account.extAccountId} disabled />
        </div>
      </div>
      <div className="add-input-row">
        <div className="add-input-field">
          <span>Name</span>
          <Input type="text" defaultValue={account.accountName} disabled />
        </div>
        <div className="add-input-field">
          <span>Account Type</span>
          <Input type="text" defaultValue={account.accountType} disabled />
        </div>
      </div>
      <div className="add-input-row">
        <div className="add-input-field">
          <span>Phone</span>
          <Input type="number" defaultValue={account.phoneNumber} disabled />
        </div>
        <div className="add-input-field">
          <span>KYC Status</span>
          <Input type="text" defaultValue="Full" disabled />
        </div>
      </div>
      <div className="add-input-row">
        <div className="wallet-load-amount">
          <span>Amount</span>
          <Input
            type="number"
            defaultValue=""
            className="wallet-load-amount-field"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadWalletModal;

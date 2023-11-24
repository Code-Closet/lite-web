import { Account1 } from "../../../model/account/types";

const DeactivateWalletModal: React.FC<{ account: Account1 }> = ({
  account,
}) => {
  return (
    <div>
      <span>{`Name : ${account.accountName}`}</span>
      <span>{`Account : ${account.extAccountId}`}</span>
    </div>
  );
};

export default DeactivateWalletModal;

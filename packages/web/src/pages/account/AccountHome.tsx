import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import AccountSummaryTable from "../../components/table/AccountSummaryTable";
import Modal, { ModalVariant } from "../../components/modal/Modal";
import "./Accounts.scss";
import { Account } from "../../model/account/types";
import AddAccountModal from "../../components/modal/account/AddAccountModal";
import LoadWalletModal from "../../components/modal/account/LoadWalletModal";
import DeactivateWalletModal from "../../components/modal/account/DeactivateWalletModal";
import PixellpayToast from "../../components/toast/PixellpayToast";
const AccountHome: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [modalVariable, setModalVariable] = useState<{
    title: string;
    proceedText: string;
    variant: ModalVariant;
    child: React.ReactNode;
    onProceed?: () => void;
  }>({
    title: "Add New Account",
    proceedText: "Add",
    variant: ModalVariant.Regular,
    child: <></>,
  });

  console.log("selectedAccount", selectedAccount);

  const handleAddAccount = () => {
    const child: React.ReactNode = <AddAccountModal />;
    setModalVariable({
      title: "Add New Account",
      proceedText: "Add",
      variant: ModalVariant.Regular,
      child: child,
      onProceed: onAddNewAccount,
    });
    setOpenModal(true);
  };

  const handleLoadWallet = () => {
    const child: React.ReactNode = <LoadWalletModal />;
    setModalVariable({
      title: "Load Wallet",
      proceedText: "Add",
      variant: ModalVariant.Regular,
      child: child,
    });
    setOpenModal(true);
  };

  const handleDeactivateWallet = () => {
    const child: React.ReactNode = <DeactivateWalletModal />;
    setModalVariable({
      title: "Deactivate Wallet",
      proceedText: "Deactivate",
      variant: ModalVariant.Tiny,
      child: child,
    });
    setOpenModal(true);
  };

  const onAddNewAccount = useCallback(() => {
    // api to modify user
    setOpenModal(false);
    toast.success("Account added successfully");
  }, []);

  return (
    <div className="account-container">
      <PixellpayToast />
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          title={modalVariable.title}
          proceedText={modalVariable.proceedText}
          variant={modalVariable.variant}
          onProceed={modalVariable.onProceed}
        >
          {modalVariable.child}
        </Modal>
      )}
      <div className="account-load-action">
        <span className="header">Accounts</span>
      </div>
      <div className="search-bar">
        <input type="number" placeholder="Phone Number" />
        <input type="text" placeholder="Name" />
        <input type="number" placeholder="Account" />
        <button type="button">
          <i className="bx bx-search">Search</i>
        </button>
      </div>

      <div className="account-summary-table">
        <AccountSummaryTable
          handleLoadWallet={handleLoadWallet}
          handleDeactivateWallet={handleDeactivateWallet}
          setSelectedAccount={setSelectedAccount}
        />
      </div>

      <div className="account-action-control">
        <button type="button" onClick={handleAddAccount}>
          <i className="bx bxs-user-account"></i>
          Add
        </button>
        <button type="button" onClick={handleLoadWallet}>
          <i className="bx bx-upload"></i>
          Bulk Add
        </button>
        <button type="button" onClick={handleDeactivateWallet}>
          <i className="bx bx-upload"></i>
          Load Wallets
        </button>
      </div>
    </div>
  );
};

export default AccountHome;

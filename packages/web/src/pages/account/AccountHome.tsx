import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal, { ModalVariant } from "../../components/modal/Modal";
import "./Accounts.scss";
import { Account, Account1, AccountList } from "../../model/account/types";
import AddAccountModal from "../../components/modal/account/AddAccountModal";
import LoadWalletModal from "../../components/modal/account/LoadWalletModal";
import DeactivateWalletModal from "../../components/modal/account/DeactivateWalletModal";
import PixellpayToast from "../../components/toast/PixellpayToast";
import FileUpload from "./FileUpload";
import AccountSummaryTable from "../../components/table/AccountSummaryTable";
import { getAccounts } from "../../api/account/account";
import Loading from "../../components/modal/Loading";
const AccountHome: React.FC = () => {
  const [isSummaryView, setIsSummaryView] = useState<boolean>(true);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openLoadWalletModal, setOpenLoadWalletModal] =
    useState<boolean>(false);
  const [openDeactivateModal, setDeactivateModal] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<Account1 | null>(null);
  const [newAccount, setNewAccount] = useState<Account>({
    phoneNumber: "",
    accountName: "",
    accountNumber: "",
    status: "",
    accountType: "",
  });
  const [fileType, setFileType] = useState<string>("account");
  const [accountData, setAccountData] = useState<AccountList>(
    {} as AccountList
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const onAddNewAccount = useCallback(() => {
    // api to modify user
    console.log("new account", newAccount);
    setOpenAddModal(false);
    toast.success("Account added successfully");
  }, [newAccount]);

  const onLoadWallet = useCallback(() => {
    console.log("load wallet", selectedAccount);
    setOpenLoadWalletModal(false);
    toast.success("Wallet loaded successfully");
  }, [selectedAccount]);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    getAccounts(url)
      .then((data) => {
        setAccountData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`Failed to get accounts ${error}`);
      });
  }, [url]);

  return (
    <div className="account-container">
      <PixellpayToast />
      {openAddModal && (
        <Modal
          setOpenModal={setOpenAddModal}
          title="Add New Account"
          proceedText="Add"
          variant={ModalVariant.Regular}
          onProceed={onAddNewAccount}
        >
          <AddAccountModal account={newAccount} setAccount={setNewAccount} />
        </Modal>
      )}
      {openLoadWalletModal && !!selectedAccount && (
        <Modal
          setOpenModal={setOpenLoadWalletModal}
          title="Load Wallet"
          proceedText="Add"
          variant={ModalVariant.Regular}
          onProceed={onLoadWallet}
        >
          <LoadWalletModal account={selectedAccount} />
        </Modal>
      )}
      {openDeactivateModal && !!selectedAccount && (
        <Modal
          setOpenModal={setDeactivateModal}
          title="Deactivate Wallet"
          proceedText="Proceed"
          variant={ModalVariant.Tiny}
          onProceed={onAddNewAccount}
        >
          <DeactivateWalletModal account={selectedAccount} />
        </Modal>
      )}
      <div className="account-load-action">
        <span className="header">Accounts</span>
      </div>

      <div className={`account-summary ${!isSummaryView ? "slide-left" : ""}`}>
        <div className="search-bar">
          <input type="number" placeholder="Phone Number" />
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Account" />
          <button type="button">
            <i className="bx bx-search">Search</i>
          </button>
        </div>
        {loading && <Loading />}
        <div className="account-summary-table">
          <AccountSummaryTable
            handleLoadWallet={() => setOpenLoadWalletModal(true)}
            handleDeactivateWallet={() => setDeactivateModal(true)}
            setSelectedAccount={setSelectedAccount}
            accountData={accountData}
            setUrl={setUrl}
          />
        </div>

        <div className="account-action-control">
          <button type="button" onClick={() => setOpenAddModal(true)}>
            <i className="bx bxs-user-account"></i>
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setFileType("account");
              setIsSummaryView(false);
            }}
          >
            <i className="bx bx-upload"></i>
            Bulk Add
          </button>
          <button
            type="button"
            onClick={() => {
              setFileType("wallet");
              setIsSummaryView(false);
            }}
          >
            <i className="bx bx-upload"></i>
            Load Wallets
          </button>
        </div>
      </div>

      <div
        className={`account-bulk-details ${
          !isSummaryView ? "slide-right" : ""
        }`}
      >
        <FileUpload setIsSummaryView={setIsSummaryView} fileType={fileType} />
      </div>
    </div>
  );
};

export default AccountHome;

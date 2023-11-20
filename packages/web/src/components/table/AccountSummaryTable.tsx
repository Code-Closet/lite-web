import { useCallback, useMemo } from "react";
import { Account, Account1 } from "../../model/account/types";
import PaginationTable from "./pixellpay-table/PaginationTable";

interface AccountSummaryTableProps {
  handleLoadWallet: () => void;
  handleDeactivateWallet: () => void;
  setSelectedAccount: (account: Account) => void;
  accountData: Account1[];
}
const AccountSummaryTable: React.FC<AccountSummaryTableProps> = ({
  handleLoadWallet,
  handleDeactivateWallet,
  setSelectedAccount,
  accountData,
}) => {
  const handleWalletLoad = useCallback((account: Account) => {
    setSelectedAccount(account);
    handleLoadWallet();
  }, []);

  const deactivateWallet = useCallback((account: Account) => {
    setSelectedAccount(account);
    handleDeactivateWallet();
  }, []);

  const columns = useMemo(() => {
    const accSummaryColumns = [
      {
        accessor: "phoneNumber",
        Header: "Phone Number",
      },
      {
        accessor: "accountName",
        Header: "CBS Account Name",
      },
      {
        accessor: "accountNumber",
        Header: "CBS Account Number",
      },
      {
        accessor: "accountType",
        Header: "CBS Account Type",
      },
      {
        accessor: "status",
        Header: "Status",
      },
      {
        Header: "Wallet",
        Cell: (params: any) => {
          return (
            <div className="wallet-cell-action">
              <div
                className="wallet-detail-action-button"
                onClick={() => handleWalletLoad(params.row.original)}
              >
                <i className="bx bx-credit-card"></i>
              </div>
              <div
                className="wallet-detail-action-button"
                onClick={() => deactivateWallet(params.row.original)}
              >
                <i className="bx bx-stop-circle"></i>
              </div>
            </div>
          );
        },
      },
    ];
    return accSummaryColumns;
  }, []);

  return (
    <>
      {!!columns && !!accountData && (
        <PaginationTable
          columns={columns}
          data={accountData}
          hideGlobalfilter={true}
        />
      )}
    </>
  );
};

export default AccountSummaryTable;

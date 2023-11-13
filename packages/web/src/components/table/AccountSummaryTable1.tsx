import { useCallback, useEffect, useMemo, useState } from "react";
import { Account } from "../../model/account/types";
import { getAccounts } from "../../api/account/account";
import PaginationTable from "./pixellpay-table/PaginationTable";

interface AccountSummaryTable1Props {
  handleLoadWallet: () => void;
  handleDeactivateWallet: () => void;
  setSelectedAccount: (account: Account) => void;
}
const AccountSummaryTable1: React.FC<AccountSummaryTable1Props> = ({
  handleLoadWallet,
  handleDeactivateWallet,
  setSelectedAccount,
}) => {
  const [rowData, setRowData] = useState<Account[]>();

  useEffect(() => {
    getAccounts().then((data) => setRowData(data));
  }, []);

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
      {!!columns && !!rowData && (
        <PaginationTable
          columns={columns}
          data={rowData}
          hideGlobalfilter={true}
        />
      )}
    </>
  );
};

export default AccountSummaryTable1;

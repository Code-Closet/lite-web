import { useCallback, useEffect, useMemo, useState } from "react";
import { Account1, AccountList } from "../../model/account/types";
//import PaginationTable from "./pixellpay-table/PaginationTable";
import { AuthData } from "../../auth/AuthGuard";
import useTableRequestParam from "../../hooks/table/useTableRequestParam";
import ServerSidePaginationTable from "./pixellpay-table/ServerSidePaginationTable";

interface AccountSummaryTableProps {
  handleLoadWallet: () => void;
  handleDeactivateWallet: () => void;
  setSelectedAccount: (account: Account1) => void;
  accountData: AccountList;
  setUrl: (url: string) => void;
}
const AccountSummaryTable: React.FC<AccountSummaryTableProps> = ({
  handleLoadWallet,
  handleDeactivateWallet,
  setSelectedAccount,
  accountData,
  setUrl,
}) => {
  const { user } = AuthData();
  const [totalCount, setTotalCount] = useState<number>(0);
  const apiEndpoint = `/api/v1/${user.financialEntityId}/account/`;

  const {
    getRequestUrl,
    requestUrl,
    page,
    size,
    canPrevious,
    canNext,
    resetPage,
  } = useTableRequestParam(apiEndpoint);

  useEffect(() => {
    if (!requestUrl) return;
    setUrl(requestUrl);
  }, [requestUrl]);

  useEffect(() => {
    if (!accountData) return;
    setTotalCount(accountData.totalElements);
    resetPage(page, size, accountData.totalElements);
  }, [accountData]);

  const handleWalletLoad = useCallback((account: Account1) => {
    setSelectedAccount(account);
    handleLoadWallet();
  }, []);

  const deactivateWallet = useCallback((account: Account1) => {
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
        accessor: "extAccountId",
        Header: "CBS Account Number",
      },
      {
        accessor: "accountType",
        Header: "CBS Account Type",
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

  const sortBy = useMemo(() => [{ id: "id", desc: false }], []);

  return (
    <>
      {!!columns && !!accountData && !!accountData.content && (
        <ServerSidePaginationTable
          columns={columns}
          data={accountData.content}
          fetchData={getRequestUrl}
          currentPage={page}
          loading={false}
          canPrevious={canPrevious}
          canNext={canNext}
          totalCount={totalCount}
          totalPage={Math.ceil(totalCount / size)}
          sortBy={sortBy}
        />
      )}
    </>
  );
};

export default AccountSummaryTable;

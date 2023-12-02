import { useEffect, useMemo, useState } from "react";
import { Account1 } from "../../model/account/types";
import { getAccountLoadDetails } from "../../api/account/account";
import { AuthData } from "../../auth/AuthGuard";
import { Batch } from "../../model/common-types";
import Loading from "../modal/Loading";
import { formatDateToCustomString } from "../../utils/tableUtils";
import useTableRequestParam from "../../hooks/table/useTableRequestParam";
import ServerSidePaginationTable from "./pixellpay-table/ServerSidePaginationTable";

const AccountsLoadDetailsTable: React.FC<{
  account: Batch;
}> = ({ account }) => {
  const { user } = AuthData();
  const [rowData, setRowData] = useState<Account1[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const apiEndpoint = `/api/v1/${user.financialEntityId}/account/batch/${account.id}`;

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
    setLoading(true);
    getAccountLoadDetails(account.id ?? "", user.financialEntityId).then(
      ({ accounts }) => {
        setTotalCount(accounts.totalElements);
        resetPage(page, size, accounts.totalElements);
        setRowData(accounts.content);
        setLoading(false);
      }
    );
  }, [account, requestUrl]);

  const columns = useMemo(() => {
    const accBulkLoadColumns = [
      {
        accessor: (row: Batch) =>
          formatDateToCustomString(row.insertTimestamp ?? ""),
        Header: "Date",
      },
      {
        accessor: "batchId",
        Header: "Bulk Load Id",
      },
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
        accessor: "account.status",
        Header: "Status",
      },
    ];
    return accBulkLoadColumns;
  }, []);
  const sortBy = useMemo(() => [{ id: "accountName", desc: false }], []);
  return (
    <>
      {loading && <Loading />}
      {!!columns && !!rowData && (
        <ServerSidePaginationTable
          columns={columns}
          data={rowData}
          fetchData={getRequestUrl}
          currentPage={page}
          loading={loading}
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

export default AccountsLoadDetailsTable;

import { useEffect, useMemo, useState } from "react";
import { Account1 } from "../../model/account/types";
import PaginationTable from "./pixellpay-table/PaginationTable";
import { getAccountLoadDetails } from "../../api/account/account";
import { AuthData } from "../../auth/AuthGuard";
import { Batch } from "../../model/common-types";
import Loading from "../modal/Loading";
import { formatDateToCustomString } from "../../utils/tableUtils";

const AccountsLoadDetailsTable: React.FC<{
  account: Batch;
}> = ({ account }) => {
  const { user } = AuthData();
  const [rowData, setRowData] = useState<Account1[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAccountLoadDetails(account.id ?? "", user.financialEntityId).then(
      (data) => {
        setRowData(data.accounts);
        setLoading(false);
      }
    );
  }, [account]);

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
  return (
    <>
      {loading && <Loading />}
      {!!columns && !!rowData && (
        <PaginationTable columns={columns} data={rowData} />
      )}
    </>
  );
};

export default AccountsLoadDetailsTable;

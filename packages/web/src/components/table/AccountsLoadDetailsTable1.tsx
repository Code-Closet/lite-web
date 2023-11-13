import { useEffect, useMemo, useState } from "react";
import { AccountLoad, AccountLoadDetail } from "../../model/account/types";
import PaginationTable from "./pixellpay-table/PaginationTable";
import { getAccountLoadDetails } from "../../api/account/account";

const AccountsLoadDetailsTable1: React.FC<{ account: AccountLoad }> = ({
  account,
}) => {
  const [rowData, setRowData] = useState<AccountLoadDetail[]>();

  useEffect(() => {
    getAccountLoadDetails(account.batchId).then((data) => setRowData(data));
  }, [account]);

  const columns = useMemo(() => {
    const accBulkLoadColumns = [
      {
        accessor: "date",
        Header: "Date",
      },
      {
        accessor: "loadId",
        Header: "Bulk Load Id",
      },
      {
        accessor: "account.phoneNumber",
        Header: "Phone Number",
      },
      {
        accessor: "account.accountName",
        Header: "CBS Account Name",
      },
      {
        accessor: "account.accountNumber",
        Header: "CBS Account Number",
      },
      {
        accessor: "account.accountType",
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
      {!!columns && !!rowData && (
        <PaginationTable columns={columns} data={rowData} />
      )}
    </>
  );
};

export default AccountsLoadDetailsTable1;

import { useCallback, useEffect, useMemo, useState } from "react";
import PaginationTable from "./pixellpay-table/PaginationTable";
import { accountBulkLoad } from "../../api/account/account";
import { AuthData } from "../../auth/AuthGuard";
import { Batch } from "../../model/common-types";
import Loading from "../modal/Loading";

const AccountsBulkLoadTable: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: Batch) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const [rowData, setRowData] = useState<Batch[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const onClick = useCallback((accountLoad: Batch) => {
    setIsSummaryView(false);
    setSelectedBatch(accountLoad);
  }, []);

  const { user } = AuthData();

  useEffect(() => {
    setLoading(true);
    accountBulkLoad(user.financialEntityId).then((data) => {
      setRowData(data.content);
      setLoading(false);
    });
  }, []);

  const columns = useMemo(() => {
    const accBulkLoadColumns = [
      {
        Header: "Batch Id",
        accessor: "id",
      },
      {
        Header: "Date",
        accessor: "insertTimestamp",
      },
      {
        accessor: "totalSuccess",
        Header: "Total Success(transactions)",
      },
      {
        accessor: "totalFailed",
        Header: "Total Failed(transactions)",
      },
      {
        Header: " ",
        Cell: (params: any) => {
          return (
            <>
              <div
                className="wallet-detail-action-button"
                onClick={() => onClick(params.row.original)}
              >
                <i className="bx bxs-id-card"></i>
              </div>
            </>
          );
        },
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

export default AccountsBulkLoadTable;

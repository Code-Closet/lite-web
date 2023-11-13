import { useCallback, useEffect, useMemo, useState } from "react";
import { AccountLoad } from "../../model/account/types";
import PaginationTable from "./pixellpay-table/PaginationTable";
import { getWalletLoads } from "../../api/wallet/wallet";

const AccountsBulkLoadTable1: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: AccountLoad) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const [rowData, setRowData] = useState<AccountLoad[]>();
  const onClick = useCallback((accountLoad: AccountLoad) => {
    setIsSummaryView(false);
    setSelectedBatch(accountLoad);
  }, []);

  useEffect(() => {
    getWalletLoads().then((data) => {
      setRowData(data);
    });
  }, []);

  const columns = useMemo(() => {
    const accBulkLoadColumns = [
      {
        Header: "Batch Id",
        accessor: "batchId",
      },
      {
        Header: "Date",
        accessor: "date",
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
      {!!columns && !!rowData && (
        <PaginationTable columns={columns} data={rowData} />
      )}
    </>
  );
};

export default AccountsBulkLoadTable1;

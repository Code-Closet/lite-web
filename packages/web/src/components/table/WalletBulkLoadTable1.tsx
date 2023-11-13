import { useCallback, useEffect, useMemo, useState } from "react";
import { WalletLoad } from "../../model/wallet/types";
import { getWalletLoads } from "../../api/wallet/wallet";
import PaginationTable from "./pixellpay-table/PaginationTable";

const WalletBulkLoadTable1: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: WalletLoad) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const [rowData, setRowData] = useState<WalletLoad[]>();

  useEffect(() => {
    getWalletLoads().then((data) => {
      setRowData(data);
    });
  }, []);

  const onClick = useCallback((wallet: WalletLoad) => {
    setIsSummaryView(false);
    setSelectedBatch(wallet);
  }, []);

  const columns = useMemo(() => {
    const walletLoadColumns = [
      {
        accessor: "batchId",
        Header: "Batch Id",
      },
      {
        accessor: "date",
        Header: "Date",
      },
      {
        accessor: "totalAmount",
        Header: "Total (Success) Amount",
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
                <i className="bx bx-wallet"></i>
              </div>
            </>
          );
        },
      },
    ];
    return walletLoadColumns;
  }, []);
  return (
    <>
      {!!columns && !!rowData && (
        <PaginationTable columns={columns} data={rowData} />
      )}
    </>
  );
};

export default WalletBulkLoadTable1;

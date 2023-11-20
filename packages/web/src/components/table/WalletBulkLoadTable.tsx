import { useCallback, useEffect, useMemo, useState } from "react";
import { getWalletLoads } from "../../api/wallet/wallet";
import PaginationTable from "./pixellpay-table/PaginationTable";
import { Batch } from "../../model/common-types";
import { AuthData } from "../../auth/AuthGuard";
import Loading from "../modal/Loading";

const WalletBulkLoadTable: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: Batch) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const { user } = AuthData();
  const [rowData, setRowData] = useState<Batch[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getWalletLoads(user.financialEntityId).then((data) => {
      setRowData(data.content);
      setLoading(false);
    });
  }, []);

  const onClick = useCallback((wallet: Batch) => {
    setIsSummaryView(false);
    setSelectedBatch(wallet);
  }, []);

  const columns = useMemo(() => {
    const walletLoadColumns = [
      {
        accessor: "id",
        Header: "Batch Id",
      },
      {
        accessor: "batchType",
        Header: "Batch Type",
      },
      {
        insertTimestamp: "date",
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
      {loading && <Loading />}
      {!!columns && !!rowData && (
        <PaginationTable columns={columns} data={rowData} />
      )}
    </>
  );
};

export default WalletBulkLoadTable;

import { useCallback, useEffect, useMemo, useState } from "react";
import { getWalletLoads } from "../../api/wallet/wallet";
//import PaginationTable from "./pixellpay-table/PaginationTable";
import { Batch } from "../../model/common-types";
import { AuthData } from "../../auth/AuthGuard";
import Loading from "../modal/Loading";
import useTableRequestParam from "../../hooks/table/useTableRequestParam";
import ServerSidePaginationTable from "./pixellpay-table/ServerSidePaginationTable";
import { formatDateToCustomString } from "../../utils/tableUtils";

const WalletBulkLoadTable: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: Batch) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const { user } = AuthData();
  const [rowData, setRowData] = useState<Batch[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const apiEndpoint = `/api/v1/${user.financialEntityId}/wallets/load/batch`;

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
    getWalletLoads(requestUrl).then((data) => {
      setTotalCount(data.totalElements);
      resetPage(page, size, data.totalElements);
      setRowData(data.content);
      setLoading(false);
    });
  }, [requestUrl]);

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
        accessor: (row: Batch) =>
          formatDateToCustomString(row.insertTimestamp ?? ""),
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

  const sortBy = useMemo(() => [{ id: "id", desc: false }], []);
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

export default WalletBulkLoadTable;

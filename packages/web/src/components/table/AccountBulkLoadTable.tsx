import { useCallback, useEffect, useMemo, useState } from "react";
//import PaginationTable from "./pixellpay-table/PaginationTable";
import { accountBulkLoadPreview } from "../../api/account/account";
import { AuthData } from "../../auth/AuthGuard";
import { Batch } from "../../model/common-types";
import Loading from "../modal/Loading";
import useTableRequestParam from "../../hooks/table/useTableRequestParam";
import { formatDateToCustomString } from "../../utils/tableUtils";
import ServerSidePaginationTable from "./pixellpay-table/ServerSidePaginationTable";

const AccountsBulkLoadTable: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: Batch) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const { user } = AuthData();

  const [rowData, setRowData] = useState<Batch[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const apiEndpoint = `/api/v1/${user.financialEntityId}/account/batch`;

  const {
    getRequestUrl,
    requestUrl,
    page,
    size,
    canPrevious,
    canNext,
    resetPage,
  } = useTableRequestParam(apiEndpoint);

  const onClick = useCallback((accountLoad: Batch) => {
    setIsSummaryView(false);
    setSelectedBatch(accountLoad);
  }, []);

  useEffect(() => {
    if (!requestUrl) return;
    setLoading(true);
    accountBulkLoadPreview(requestUrl).then((data) => {
      setTotalCount(data.totalElements);
      resetPage(page, size, data.totalElements);
      setRowData(data.content);
      setLoading(false);
    });
  }, [requestUrl]);

  const columns = useMemo(() => {
    const accBulkLoadColumns = [
      {
        Header: "Batch Id",
        accessor: "id",
      },
      {
        Header: "Date",
        accessor: (row: Batch) =>
          formatDateToCustomString(row.insertTimestamp ?? ""),
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

export default AccountsBulkLoadTable;

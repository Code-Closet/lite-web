import { useEffect, useMemo, useState } from "react";
import { AuthData } from "../../auth/AuthGuard";
import { WorkflowState } from "../../model/approval/types";
import useTableRequestParam from "../../hooks/table/useTableRequestParam";
import { getWorkflow } from "../../api/approval/approval";
import { formatDateToCustomString } from "../../utils/tableUtils";
import Loading from "../modal/Loading";
import ServerSidePaginationTable from "./pixellpay-table/ServerSidePaginationTable";

const WalletApprovalTable: React.FC = () => {
  const { user } = AuthData();
  const [rowData, setRowData] = useState<WorkflowState[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const apiEndpoint = `/api/v1/${user.financialEntityId}/workflow`;

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
    getWorkflow(user.financialEntityId).then((data) => {
      setTotalCount(data.totalElements);
      resetPage(page, size, data.totalElements);
      setRowData(data.content);
      setLoading(false);
    });
  }, [requestUrl]);

  const columns = useMemo(() => {
    const approvalColumns = [
      {
        accessor: (row: WorkflowState) =>
          formatDateToCustomString(row.insertTimestamp ?? ""),
        Header: "Date",
      },
      {
        accessor: "currentState",
        Header: "Current State",
      },
      {
        accessor: "assignedTo",
        Header: "Assignee",
      },
      {
        accessor: "assignedRole",
        Header: "Role",
      },
      {
        accessor: "status",
        Header: "Status",
      },
    ];
    return approvalColumns;
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

export default WalletApprovalTable;

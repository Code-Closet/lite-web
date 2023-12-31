import { useEffect, useMemo, useState } from "react";
import { Wallet } from "../../model/wallet/types";
import { getWalletLoadDetails } from "../../api/wallet/wallet";
//import PaginationTable from "./pixellpay-table/PaginationTable";
import { AuthData } from "../../auth/AuthGuard";
import { Batch } from "../../model/common-types";
import Loading from "../modal/Loading";
import useTableRequestParam from "../../hooks/table/useTableRequestParam";
import { formatDateToCustomString } from "../../utils/tableUtils";
import ServerSidePaginationTable from "./pixellpay-table/ServerSidePaginationTable";

const WalletLoadDetailsTable: React.FC<{ wallet: Batch }> = ({ wallet }) => {
  const { user } = AuthData();
  const [rowData, setRowData] = useState<Wallet[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const apiEndpoint = `/api/v1/${user.financialEntityId}/wallets/load/${wallet.id}`;

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
    getWalletLoadDetails(requestUrl).then((data) => {
      setTotalCount(data.totalElements);
      resetPage(page, size, data.totalElements);
      setRowData(data.content);
      setLoading(false);
    });
  }, [wallet, requestUrl]);

  const columns = useMemo(() => {
    const walletLoadColumns = [
      {
        accessor: (row: Batch) =>
          formatDateToCustomString(row.insertTimestamp ?? ""),
        Header: "Date",
      },
      {
        accessor: "loadId",
        Header: "Bulk Load Id",
      },
      {
        accessor: "walletId",
        Header: "Wallet",
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
        accessor: "accountNumber",
        Header: "CBS Account Number",
      },
      {
        accessor: "amount",
        Header: "Amount",
      },
      {
        accessor: "status",
        Header: "Status",
      },
    ];
    return walletLoadColumns;
  }, []);

  const sortBy = useMemo(() => [{ id: "loadId", desc: false }], []);

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

export default WalletLoadDetailsTable;

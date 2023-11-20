import { useEffect, useMemo, useState } from "react";
import { Wallet } from "../../model/wallet/types";
import { getWalletLoadDetails } from "../../api/wallet/wallet";
import PaginationTable from "./pixellpay-table/PaginationTable";
import { AuthData } from "../../auth/AuthGuard";
import { Batch } from "../../model/common-types";
import Loading from "../modal/Loading";

const WalletLoadDetailsTable: React.FC<{ wallet: Batch }> = ({ wallet }) => {
  const { user } = AuthData();
  const [rowData, setRowData] = useState<Wallet[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const columns = useMemo(() => {
    const walletLoadColumns = [
      {
        accessor: "insertTimestamp",
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

  useEffect(() => {
    setLoading(true);
    getWalletLoadDetails(user.financialEntityId, wallet.id ?? "").then(
      (data) => {
        setRowData(data.content);
        setLoading(false);
      }
    );
  }, [wallet]);

  return (
    <>
      {loading && <Loading />}
      {!!columns && !!rowData && (
        <PaginationTable columns={columns} data={rowData} />
      )}
    </>
  );
};

export default WalletLoadDetailsTable;

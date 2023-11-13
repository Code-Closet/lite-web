import { useEffect, useMemo, useState } from "react";
import { WalletLoad, WalletLoadDetail } from "../../model/wallet/types";
import { getWalletLoadDetails } from "../../api/wallet/wallet";
import PaginationTable from "./pixellpay-table/PaginationTable";

const WalletLoadDetailsTable1: React.FC<{ wallet: WalletLoad }> = ({
  wallet,
}) => {
  const [rowData, setRowData] = useState<WalletLoadDetail[]>();
  const columns = useMemo(() => {
    const walletLoadColumns = [
      {
        accessor: "date",
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
    getWalletLoadDetails(wallet.batchId).then((data) => setRowData(data));
  }, [wallet]);

  return (
    <>
      {!!columns && !!rowData && (
        <PaginationTable columns={columns} data={rowData} />
      )}
    </>
  );
};

export default WalletLoadDetailsTable1;

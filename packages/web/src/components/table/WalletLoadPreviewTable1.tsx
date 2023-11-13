import { useEffect, useMemo, useState } from "react";
import { WalletLoadPreview } from "../../model/wallet/types";
import RowSelectionTable from "./pixellpay-table/RowSelectionTable";

const WalletLoadPreviewTable1: React.FC<{
  previewRowData: WalletLoadPreview[];
}> = ({ previewRowData }) => {
  const [rowData, setRowData] = useState<WalletLoadPreview[]>();
  const [selectedRow, setSelectedRow] = useState<WalletLoadPreview>();

  useEffect(() => {
    setRowData(previewRowData);
    console.log("selected", selectedRow);
  }, [previewRowData]);

  const columns = useMemo(() => {
    const previewColumns = [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "phoneNumber",
        Header: "Phone Number",
      },
      {
        accessor: "accountNumber",
        Header: "Account",
      },
      {
        accessor: "walletNumber",
        Header: "Wallet",
      },
      {
        accessor: "amount",
        Header: "Amount",
      },
      {
        Header: "Validations",
        Cell: (params: any) => {
          return (
            <div className="validation-cell">
              {params.row.original?.isValid ? (
                <i className="bx bxs-check-circle success"></i>
              ) : (
                <i className="bx bxs-error error"></i>
              )}
              <span>{params.row.original?.message}</span>
            </div>
          );
        },
      },
    ];
    return previewColumns;
  }, []);

  return (
    <>
      {!!columns && !!rowData && (
        <RowSelectionTable
          columns={columns}
          data={rowData}
          setSelectedRows={setSelectedRow}
        />
      )}
    </>
  );
};

export default WalletLoadPreviewTable1;

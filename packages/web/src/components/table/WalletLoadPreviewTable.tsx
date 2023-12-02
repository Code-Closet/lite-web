import { useEffect, useMemo, useState } from "react";
import { WalletLoadPreview } from "../../model/wallet/types";
import RowSelectionTable from "./pixellpay-table/RowSelectionTable";

const WalletLoadPreviewTable: React.FC<{
  previewRowData: WalletLoadPreview[];
  setSelectedRecords: (records: any[]) => void;
}> = ({ previewRowData, setSelectedRecords }) => {
  const [rowData, setRowData] = useState<WalletLoadPreview[]>();

  useEffect(() => {
    setRowData(previewRowData);
  }, [previewRowData]);

  const columns = useMemo(() => {
    const previewColumns = [
      {
        accessor: "account_number",
        Header: "Account Number",
      },
      {
        accessor: "phone_number",
        Header: "Phone Number",
      },
      {
        accessor: "account_type",
        Header: "Account Type",
      },
      {
        accessor: "transaction_type",
        Header: "Transaction",
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
              {params.row.original?.validations ? (
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
          setSelectedRows={setSelectedRecords}
        />
      )}
    </>
  );
};

export default WalletLoadPreviewTable;

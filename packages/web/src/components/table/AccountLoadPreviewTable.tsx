import { useEffect, useMemo, useState } from "react";
import { AccountLoadPreview } from "../../model/account/types";
import RowSelectionTable from "./pixellpay-table/RowSelectionTable";

const AccountLoadPreviewTable: React.FC<{
  previewRowData: AccountLoadPreview[];
}> = ({ previewRowData }) => {
  const [rowData, setRowData] = useState<AccountLoadPreview[]>();
  const [selectedRow, setSelectedRow] = useState<AccountLoadPreview>();

  useEffect(() => {
    setRowData(previewRowData);
    console.log("selected", selectedRow);
  }, [previewRowData]);

  const columns = useMemo(() => {
    const previewColumns = [
      {
        accessor: "phoneNumber",
        Header: "Phone Number",
      },
      {
        accessor: "accountName",
        Header: "Account Name",
      },
      {
        accessor: "accountNumber",
        Header: "Account Number",
      },
      {
        accessor: "accountType",
        Header: "Account Type",
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

export default AccountLoadPreviewTable;

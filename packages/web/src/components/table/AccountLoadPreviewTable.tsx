import { useEffect, useMemo, useState } from "react";
import { AccountLoadPreview } from "../../model/account/types";
import RowSelectionTable from "./pixellpay-table/RowSelectionTable";

const AccountLoadPreviewTable: React.FC<{
  previewRowData: AccountLoadPreview[];
  setSelectedRecords: (records: any[]) => void;
}> = ({ previewRowData, setSelectedRecords }) => {
  const [rowData, setRowData] = useState<AccountLoadPreview[]>();

  useEffect(() => {
    setRowData(previewRowData);
  }, [previewRowData]);

  const columns = useMemo(() => {
    const previewColumns = [
      {
        accessor: "phone_number",
        Header: "Phone Number",
      },
      {
        accessor: "account_name",
        Header: "Account Name",
      },
      {
        accessor: "account_id",
        Header: "Account Number",
      },
      {
        accessor: "account_type",
        Header: "Account Type",
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

export default AccountLoadPreviewTable;

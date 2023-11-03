import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, IRowNode } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.scss";
import { AccountLoadPreview } from "../../model/account/types";
import ValidationCellRenderer, {
  ValidationCellRendererParams,
} from "./cell/ValidationCellRenderer";
interface AccountLoadPreviewTableProps {
  previewRowData: AccountLoadPreview[];
}

const AccountLoadPreviewTable: React.FC<AccountLoadPreviewTableProps> = ({
  previewRowData,
}) => {
  const [rowData, setRowData] = useState<AccountLoadPreview[]>();
  const gridRef = useRef<AgGridReact<AccountLoadPreview>>(null);

  const onGridReady = useCallback(() => {
    setRowData(previewRowData);
    sizeToFit();
  }, []);

  const sizeToFit = useCallback(() => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      sortable: true,
    };
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      filter: "agTextColumnFilter",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {
      field: "accountName",
      headerName: "Account Name",
    },
    {
      field: "accountNumber",
      headerName: "Account Number",
    },
    {
      field: "accountType",
      headerName: "Account Type",
    },
    {
      headerName: "Validations",
      cellRenderer: ValidationCellRenderer,
      valueGetter: (params): ValidationCellRendererParams => {
        return { isValid: params.data?.isValid, message: params.data?.message };
      },
    },
  ]);

  return (
    <div className="ag-theme-alpine" id="ag-grid-container">
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowHeight={60}
        pagination={true}
        paginationPageSize={15}
        onGridSizeChanged={sizeToFit}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        isRowSelectable={(params: IRowNode<AccountLoadPreview>): boolean => {
          return (!!params.data && params.data.isValid) || false;
        }}
      ></AgGridReact>
    </div>
  );
};

export default AccountLoadPreviewTable;

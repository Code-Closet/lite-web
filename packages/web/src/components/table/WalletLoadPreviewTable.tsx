import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, IRowNode } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.scss";
import { WalletLoadPreview } from "../../model/wallet/types";
import ValidationCellRenderer, {
  ValidationCellRendererParams,
} from "./cell/ValidationCellRenderer";

interface WalletLoadPreviewTableProps {
  previewRowData: WalletLoadPreview[];
}
const WalletLoadPreviewTable: React.FC<WalletLoadPreviewTableProps> = ({
  previewRowData,
}) => {
  const [rowData, setRowData] = useState<WalletLoadPreview[]>();
  const gridRef = useRef<AgGridReact<WalletLoadPreview>>(null);

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
      field: "name",
      headerName: "Name",
      filter: "agTextColumnFilter",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
    },
    {
      field: "accountNumber",
      headerName: "Account",
    },
    {
      field: "walletNumber",
      headerName: "Wallet",
    },
    {
      field: "amount",
      headerName: "Amount",
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
        isRowSelectable={(params: IRowNode<WalletLoadPreview>): boolean => {
          return (!!params.data && params.data.isValid) || false;
        }}
      ></AgGridReact>
    </div>
  );
};

export default WalletLoadPreviewTable;

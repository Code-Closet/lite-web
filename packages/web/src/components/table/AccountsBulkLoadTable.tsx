import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.scss";
import { AccountLoad } from "../../model/account/types";
import { getWalletLoads } from "../../api/wallet/wallet";
import WalletDetailRenderer from "./cell/WalletDetailRenderer";

const AccountsBulkLoadTable: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: AccountLoad) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const [rowData, setRowData] = useState<AccountLoad[]>();
  const gridRef = useRef<AgGridReact<AccountLoad>>(null);

  const onGridReady = useCallback(() => {
    getWalletLoads().then((data) => {
      setRowData(data);
      sizeToFit();
    });
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

  const onClick = useCallback((accountLoad: AccountLoad) => {
    setIsSummaryView(false);
    setSelectedBatch(accountLoad);
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "batchId",
      headerName: "Batch Id",
      filter: "agTextColumnFilter",
    },
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "totalSuccess",
      headerName: "Total Success(transactions)",
    },
    {
      field: "totalFailed",
      headerName: "Total Failed(transactions)",
    },
    {
      headerName: "",
      cellRenderer: WalletDetailRenderer,
      cellRendererParams: {
        onClick: onClick.bind(this),
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
      ></AgGridReact>
    </div>
  );
};

export default AccountsBulkLoadTable;

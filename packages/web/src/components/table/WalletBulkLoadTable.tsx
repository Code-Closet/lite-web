import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.scss";
import { WalletLoad } from "../../model/wallet/types";
import { getWalletLoads } from "../../api/wallet/wallet";
import WalletDetailRenderer from "./cell/WalletDetailRenderer";

const WalletBulkLoadTable: React.FC<{
  setIsSummaryView: (view: boolean) => void;
  setSelectedBatch: (batch: WalletLoad) => void;
}> = ({ setIsSummaryView, setSelectedBatch }) => {
  const [rowData, setRowData] = useState<WalletLoad[]>();
  const gridRef = useRef<AgGridReact<WalletLoad>>(null);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback(() => {
    getWalletLoads().then((data) => {
      setRowData(data);
      sizeToFit();
    });
  }, []);

  const sizeToFit = useCallback(() => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const onClick = useCallback((wallet: WalletLoad) => {
    setIsSummaryView(false);
    setSelectedBatch(wallet);
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
      field: "totalAmount",
      headerName: "Total (Success) Amount",
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
    <Fragment>
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
    </Fragment>
  );
};

export default WalletBulkLoadTable;

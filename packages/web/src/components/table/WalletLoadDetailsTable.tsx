import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.scss";

import { WalletLoad, WalletLoadDetail } from "../../model/wallet/types";
import { getWalletLoadDetails } from "../../api/wallet/wallet";

const WalletLoadDetailsTable: React.FC<{ wallet: WalletLoad }> = ({
  wallet,
}) => {
  const [rowData] = useState<WalletLoadDetail[]>();
  const gridRef = useRef<AgGridReact<WalletLoadDetail>>(null);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      sortable: true,
    };
  }, []);

  useEffect(() => {
    onGridReady();
  }, [wallet]);

  const onGridReady = () => {
    getWalletLoadDetails(wallet.batchId).then((data) => {
      gridRef.current!.api.setRowData(data);
      sizeToFit();
    });
  };

  const sizeToFit = useCallback(() => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "loadId",
      headerName: "Bulk Load Id",
    },
    {
      field: "walletId",
      headerName: "Wallet",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
    },
    {
      field: "accountName",
      headerName: "CBS Account Name",
    },
    {
      field: "accountNumber",
      headerName: "CBS Account Number",
    },
    {
      field: "amount",
      headerName: "Amount",
    },
    {
      field: "status",
      headerName: "Status",
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

export default WalletLoadDetailsTable;

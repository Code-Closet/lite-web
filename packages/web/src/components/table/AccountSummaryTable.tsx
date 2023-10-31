import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.scss";
import { Account } from "../../model/account/types";
import { getAccounts } from "../../api/account/account";
import WalletActionCellRenderer from "./cell/WalletActionCellRenderer";
const AccountSummaryTable: React.FC<{
  handleLoadWallet: () => void;
  handleDeactivateWallet: () => void;
  setSelectedAccount: (account: Account) => void;
}> = ({ handleLoadWallet, handleDeactivateWallet, setSelectedAccount }) => {
  const [rowData] = useState<Account[]>();
  const gridRef = useRef<AgGridReact<Account>>(null);

  const onGridReady = useCallback(() => {
    getAccounts().then((data) => {
      gridRef?.current?.api?.setRowData(data);
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

  const handleWalletLoad = useCallback((account: Account) => {
    setSelectedAccount(account);
    handleLoadWallet();
  }, []);

  const deactivateWallet = useCallback((account: Account) => {
    setSelectedAccount(account);
    handleDeactivateWallet();
  }, []);

  const [columnDefs] = useState<ColDef[]>([
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
      field: "accountType",
      headerName: "CBS Account Type",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      headerName: "Wallet",
      cellRenderer: WalletActionCellRenderer,
      cellRendererParams: {
        onLoadWallet: handleWalletLoad.bind(this),
        onDeactivateWallet: deactivateWallet.bind(this),
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

export default AccountSummaryTable;

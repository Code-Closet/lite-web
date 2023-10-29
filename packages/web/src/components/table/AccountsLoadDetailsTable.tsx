import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.scss";
import { AccountLoad, AccountLoadDetail } from "../../model/account/types";
import { getAccountLoadDetails } from "../../api/account/account";

const AccountsLoadDetailsTable: React.FC<{ account: AccountLoad }> = ({
  account,
}) => {
  const [rowData] = useState<AccountLoadDetail[]>();
  const gridRef = useRef<AgGridReact<AccountLoadDetail>>(null);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      sortable: true,
    };
  }, []);

  useEffect(() => {
    onGridReady();
  }, [account]);

  const onGridReady = () => {
    getAccountLoadDetails(account.batchId).then((data) => {
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

export default AccountsLoadDetailsTable;

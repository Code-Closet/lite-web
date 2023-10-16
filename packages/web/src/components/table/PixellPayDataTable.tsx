import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.css";

import { User, generateUsers } from "../../api/admin/admin";
import StatusRenderer from "./cell/StatusCellRenderer";
import NameRenderer from "./cell/NameCellRenderer";
import RoleRenderer from "./cell/RoleCellRenderer";
import ActionCellRenderer from "./cell/ActionCellRenderer";

const PixellPayDataTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<User>>(null);
  const [rowData, setRowData] = useState<User[]>();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback(() => {
    // API goes here
    setRowData(generateUsers(100000));
    sizeToFit();
  }, []);

  const sizeToFit = useCallback(() => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Name",
      filter: "agTextColumnFilter",
      valueGetter: (params) => {
        return `${params.data?.name}~~${params.data?.email}`;
      },
      cellRenderer: NameRenderer,
    },
    { field: "status", headerName: "", cellRenderer: StatusRenderer },
    { field: "role", headerName: "User Role", cellRenderer: RoleRenderer },
    { headerName: "Actions", cellRenderer: ActionCellRenderer },
  ]);

  return (
    <div className="ag-theme-alpine" id="ag-grid-container">
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowHeight={60}
        pagination={true}
        paginationPageSize={15}
      ></AgGridReact>
    </div>
  );
};

export default PixellPayDataTable;

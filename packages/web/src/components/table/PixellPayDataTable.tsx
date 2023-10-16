import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";
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
import Modal from "../modal/Modal";
import DeleteUserModal from "../modal/admin/DeleteUserModal";

const PixellPayDataTable: React.FC = () => {
  const [modifyUserModal, setModifyUserModal] = useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const gridRef = useRef<AgGridReact<User>>(null);
  const [rowData, setRowData] = useState<User[]>();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      sortable: true,
    };
  }, []);

  const onModifyUser = useCallback((user: User) => {
    setModifyUserModal(true);
    setSelectedUser(user);
  }, []);

  const onDeleteUser = useCallback((user: User) => {
    setDeleteUserModal(true);
    setSelectedUser(user);
  }, []);

  const onDeleteUserConfirm = useCallback(() => {
    console.log("delete user", selectedUser);
    // api to delete user
    setDeleteUserModal(false);
    setSelectedUser(null);
    // toast message
  }, [selectedUser]);

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
    {
      headerName: "Actions",
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        onEditUser: onModifyUser.bind(this),
        onDeleteUser: onDeleteUser.bind(this),
      },
    },
  ]);

  return (
    <Fragment>
      {modifyUserModal && !!selectedUser && (
        <Modal setOpenModal={setModifyUserModal} />
      )}
      {deleteUserModal && !!selectedUser && (
        <Modal
          setOpenModal={setDeleteUserModal}
          proceedText="Delete"
          onProceed={onDeleteUserConfirm.bind(this)}
        >
          <DeleteUserModal />
        </Modal>
      )}
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
    </Fragment>
  );
};

export default PixellPayDataTable;

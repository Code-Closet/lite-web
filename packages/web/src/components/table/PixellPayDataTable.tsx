import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.css";

import { User, generateUsers, getRoles } from "../../api/admin/admin";
import StatusRenderer from "./cell/StatusCellRenderer";
import NameRenderer from "./cell/NameCellRenderer";
import RoleRenderer from "./cell/RoleCellRenderer";
import ActionCellRenderer from "./cell/ActionCellRenderer";
import Modal, { ModalVariant } from "../modal/Modal";
import DeleteUserModal from "../modal/admin/DeleteUserModal";
import ModifyUserModal from "../modal/admin/ModifyUserModal";
import PixellpayToast from "../toast/PixellpayToast";
import { toast } from "react-toastify";

const PixellPayDataTable: React.FC = () => {
  const [modifyUserModal, setModifyUserModal] = useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modifiedUser, setModifiedUser] = useState<User | null>(null);
  const gridRef = useRef<AgGridReact<User>>(null);
  const [rowData, setRowData] = useState<User[]>();
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);

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
    toast.success("User deleted successfully");
    onGridReady();
  }, [selectedUser]);

  const onModifyUserConfirm = useCallback(() => {
    console.log("modify user", modifiedUser);
    // api to modify user
    setModifyUserModal(false);
    setSelectedUser(null);
    toast.success("User modified successfully");
    onGridReady();
  }, [selectedUser, modifiedUser]);

  const onGridReady = useCallback(() => {
    // API goes here
    setRowData(generateUsers(10000));
    sizeToFit();
    initRoles();
  }, []);

  const sizeToFit = useCallback(() => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const initRoles = useCallback(() => {
    getRoles().then((roles) => {
      setRoles(roles);
    });
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Name",
      filter: "agTextColumnFilter",
      valueGetter: (params) => {
        return `${params.data?.name}~~${params.data?.email}`;
      },
      cellRenderer: NameRenderer,
      flex: 2,
    },
    { field: "status", headerName: "", cellRenderer: StatusRenderer, flex: 1 },
    {
      field: "role",
      headerName: "User Role",
      cellRenderer: RoleRenderer,
      flex: 2,
    },
    {
      headerName: "Actions",
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        onEditUser: onModifyUser.bind(this),
        onDeleteUser: onDeleteUser.bind(this),
      },
      flex: 2,
    },
  ]);

  return (
    <Fragment>
      <PixellpayToast />
      {modifyUserModal && !!selectedUser && (
        <Modal
          setOpenModal={setModifyUserModal}
          proceedText="Update"
          title="Modify User"
          variant={ModalVariant.Regular}
          onProceed={onModifyUserConfirm.bind(this)}
        >
          <ModifyUserModal
            user={selectedUser}
            roles={roles}
            modifiedUser={selectedUser}
            setModifiedUser={setModifiedUser}
          />
        </Modal>
      )}
      {deleteUserModal && !!selectedUser && (
        <Modal
          setOpenModal={setDeleteUserModal}
          proceedText="Delete"
          onProceed={onDeleteUserConfirm.bind(this)}
          variant={ModalVariant.Tiny}
        >
          <DeleteUserModal user={selectedUser} />
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
          onGridSizeChanged={sizeToFit}
        ></AgGridReact>
      </div>
    </Fragment>
  );
};

export default PixellPayDataTable;

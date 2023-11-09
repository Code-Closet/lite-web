import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  User,
  UserResponse,
  fetchAllUsers,
  getRoles,
} from "../../api/admin/admin";
import PixellpayToast from "../toast/PixellpayToast";
import Modal, { ModalVariant } from "../modal/Modal";
import ModifyUserModal from "../modal/admin/ModifyUserModal";
import { toast } from "react-toastify";
import DeleteUserModal from "../modal/admin/DeleteUserModal";
import PaginationTable from "./pixellpay-table/PaginationTable";

const AdminTable: React.FC = () => {
  const [modifyUserModal, setModifyUserModal] = useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modifiedUser, setModifiedUser] = useState<User | null>(null);
  //const [rowData, setRowData] = useState<User[]>();
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [users, setUsers] = useState<UserResponse>();

  useEffect(() => {
    fetchAllUsers().then((users) => {
      console.log(users);
      setUsers(users);
    });
    //setRowData(generateUsers(1000));
    initRoles();
  }, []);

  const initRoles = useCallback(() => {
    getRoles().then((roles) => {
      setRoles(roles);
    });
  }, []);

  const onDeleteUserConfirm = useCallback(() => {
    console.log("delete user", selectedUser);
    // api to delete user
    setDeleteUserModal(false);
    setSelectedUser(null);
    toast.success("User deleted successfully");
  }, [selectedUser]);

  const onModifyUserConfirm = useCallback(() => {
    console.log("modify user", modifiedUser);
    // api to modify user
    setModifyUserModal(false);
    setSelectedUser(null);
    toast.success("User modified successfully");
  }, [selectedUser, modifiedUser]);

  const columns = useMemo(() => {
    const adminColumns = [
      {
        Header: "Name",
        accessor: (row: User) => {
          return `${row.firstName} ${row.lastName}`;
        },
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Status",
        accessor: "status",
        disableFilters: true,
      },
      {
        Header: "Role",
        accessor: "userType",
      },
      {
        Header: "Action",
        Cell: (params: any) => {
          return (
            <>
              <div className="action-field">
                <div
                  className="action-button"
                  onClick={() => {
                    console.log(params);
                    setModifyUserModal(true);
                    setSelectedUser(params.row.original);
                  }}
                >
                  <img src="./assets/admin/modify.svg" alt="modify" />
                  <label htmlFor="modify" style={{ cursor: "pointer" }}>
                    Modify User
                  </label>
                </div>
                <div
                  className="action-button"
                  onClick={() => setDeleteUserModal(true)}
                >
                  <img src="./assets/admin/delete.svg" alt="delete" />
                  <label htmlFor="modify" style={{ cursor: "pointer" }}>
                    Remove User
                  </label>
                </div>
              </div>
            </>
          );
        },
      },
    ];
    return adminColumns;
  }, []);

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
      {!!columns && !!users && (
        <PaginationTable columns={columns} data={users.content} />
      )}
    </Fragment>
  );
};

export default AdminTable;

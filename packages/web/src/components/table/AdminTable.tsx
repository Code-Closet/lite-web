import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  User,
  UserResponse,
  fetchAllUsers,
  getRoles,
  updateUser,
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
  const [modifiedUser, setModifiedUser] = useState<User>({} as User);
  //const [rowData, setRowData] = useState<User[]>();
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [users, setUsers] = useState<UserResponse>();

  useEffect(() => {
    fetchAllUsers("1001").then((users) => {
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
    modifiedUser.updateTimestamp = formatDateToCustomString(new Date());
    console.log("modify user", modifiedUser);
    updateUser(modifiedUser).then(() => {
      setModifyUserModal(false);
      setSelectedUser(null);
      toast.success("User modified successfully");
    });
    // api to modify user
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

  const formatDateToCustomString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

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
            modifiedUser={modifiedUser}
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

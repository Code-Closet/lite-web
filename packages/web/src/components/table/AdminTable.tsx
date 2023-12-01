import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteUser,
  fetchAllUsers,
  getRoles,
  updateUser,
} from "../../api/admin/admin";
import PixellpayToast from "../toast/PixellpayToast";
import Modal, { ModalVariant } from "../modal/Modal";
import ModifyUserModal from "../modal/admin/ModifyUserModal";
import { toast } from "react-toastify";
import DeleteUserModal from "../modal/admin/DeleteUserModal";
//import PaginationTable from "./pixellpay-table/PaginationTable";
import { AuthData } from "../../auth/AuthGuard";
import { User, UserResponse } from "../../model/user/types";
import Loading from "../modal/Loading";
import useTableRequestParam from "../../hooks/table/useTableRequestParam";
import ServerSidePaginationTable from "./pixellpay-table/ServerSidePaginationTable";

const AdminTable: React.FC<{ isAdded: boolean; user: User }> = ({
  isAdded,
  user: newUser,
}) => {
  const [modifyUserModal, setModifyUserModal] = useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modifiedUser, setModifiedUser] = useState<User>({} as User);
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [users, setUsers] = useState<UserResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isValidForm, setIsValidForm] = useState<boolean>(true);

  const { user: loggedInUser } = AuthData();
  const apiEndpoint = `/api/v1/${loggedInUser.financialEntityId}/users`;
  const {
    getRequestUrl,
    requestUrl,
    page,
    size,
    canPrevious,
    canNext,
    resetPage,
  } = useTableRequestParam(apiEndpoint);
  useEffect(() => {
    console.log("new user", newUser);
    if (!requestUrl) return;
    setLoading(true);
    fetchAllUsers(requestUrl).then((users) => {
      setTotalCount(users.totalElements);
      resetPage(page, size, users.totalElements);
      setUsers(users);
      setLoading(false);
    });
    initRoles();
  }, [requestUrl, isAdded]);

  const initRoles = useCallback(() => {
    getRoles().then((roles) => {
      setRoles(roles);
    });
  }, []);

  const onDeleteUserConfirm = useCallback(() => {
    console.log("delete user", selectedUser);
    deleteUser(
      loggedInUser.financialEntityId.toString(),
      selectedUser ?? ({} as User)
    )
      .then(() => {
        setDeleteUserModal(false);
        setSelectedUser(null);
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        setDeleteUserModal(false);
        setSelectedUser(null);
        toast.error(`User deletion failed : ${error}`);
      });
  }, [selectedUser]);

  const onModifyUserConfirm = useCallback(() => {
    modifiedUser.updateTimestamp = formatDateToCustomString(new Date());
    console.log("modify user", modifiedUser);
    updateUser(loggedInUser.financialEntityId.toString(), modifiedUser)
      .then(() => {
        if (users && users.content) {
          const updatedUsers = users?.content.map((user) => {
            if (user.id === modifiedUser.id) {
              return modifiedUser;
            }
            return user;
          });
          setUsers({ ...users, content: updatedUsers });
        }

        setModifyUserModal(false);
        setSelectedUser(null);
        toast.success("User modified successfully");
      })
      .catch((error) => {
        setModifyUserModal(false);
        setSelectedUser(null);
        toast.error(`User modification failed : ${error}`);
      });
    // api to modify user
  }, [selectedUser, modifiedUser]);

  const sortBy = useMemo(() => [{ id: "username", desc: false }], []);

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
                  <i className="bx bxs-user-detail"></i>
                  <label htmlFor="modify" style={{ cursor: "pointer" }}>
                    Modify User
                  </label>
                </div>
                <div
                  className="action-button"
                  onClick={() => {
                    setDeleteUserModal(true);
                    setSelectedUser(params.row.original);
                  }}
                >
                  <i className="bx bxs-user-x"></i>
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
          isValidForm={isValidForm}
        >
          <ModifyUserModal
            user={selectedUser}
            roles={roles}
            modifiedUser={modifiedUser}
            setModifiedUser={setModifiedUser}
            setIsValidForm={setIsValidForm}
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
      {loading && <Loading />}
      {!!columns && !!users && (
        <ServerSidePaginationTable
          columns={columns}
          data={users.content}
          fetchData={getRequestUrl}
          currentPage={page}
          loading={loading}
          canPrevious={canPrevious}
          canNext={canNext}
          totalCount={totalCount}
          totalPage={Math.ceil(totalCount / size)}
          sortBy={sortBy}
        />
      )}
    </Fragment>
  );
};

export default AdminTable;

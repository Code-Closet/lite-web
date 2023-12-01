import React, { useCallback, useEffect, useState } from "react";
//import PixellPayDataTable from "../../components/table/PixellPayDataTable";
import Modal, { ModalVariant } from "../../components/modal/Modal";
import "./AdminHome.scss";
import AddUserModal from "../../components/modal/admin/AddUserModal";
import { addUser, getRoles } from "../../api/admin/admin";
import { toast } from "react-toastify";
//import Table from "../../components/table/pixellpay-table/Table";
import AdminTable from "../../components/table/AdminTable";
import { AuthData } from "../../auth/AuthGuard";
import { User } from "../../model/user/types";

const AdminHome: React.FC = () => {
  const { user: loggedInUser } = AuthData();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    financialEntityId: loggedInUser.financialEntityId.toString(),
    username: "",
    status: "",
    phoneNumber: "",
  });
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);

  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    getRoles().then((roles) => {
      setRoles(roles);
    });
  });

  const onAddNewUser = useCallback(() => {
    setIsAdded(false);
    console.log("new user", newUser);
    addUser(loggedInUser.financialEntityId.toString(), newUser).then(() => {
      setIsAdded(true);
      setOpenModal(false);
      toast.success("User modified successfully");
    });
  }, [newUser]);
  return (
    <>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          title="Add User"
          proceedText="Add"
          variant={ModalVariant.Regular}
          onProceed={onAddNewUser}
          isValidForm={isValidForm}
        >
          <AddUserModal
            user={newUser}
            setUser={setNewUser}
            roles={roles}
            setIsValidForm={setIsValidForm}
          />
        </Modal>
      )}
      <div className="admin-container">
        <button type="button" onClick={() => setOpenModal(true)}>
          <i className={`bx bx-user-plus`}></i>
          Add User
        </button>
        <AdminTable isAdded={isAdded} user={newUser} />
      </div>
    </>
  );
};

export default AdminHome;

import React, { useCallback, useEffect, useState } from "react";
import PixellPayDataTable from "../../components/table/PixellPayDataTable";
import Modal, { ModalVariant } from "../../components/modal/Modal";
import "./AdminHome.scss";
import AddUserModal from "../../components/modal/admin/AddUserModal";
import { User, getRoles } from "../../api/admin/admin";
import { toast } from "react-toastify";

const AdminHome: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    status: "",
    role: "",
  });
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    getRoles().then((roles) => {
      setRoles(roles);
    });
  });

  const onAddNewUser = useCallback(() => {
    console.log("new user", newUser);
    // api to modify user
    setOpenModal(false);
    toast.success("User modified successfully");
  }, [newUser]);
  return (
    <>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          title="Add User"
          variant={ModalVariant.Regular}
          onProceed={onAddNewUser}
        >
          <AddUserModal user={newUser} setUser={setNewUser} roles={roles} />
        </Modal>
      )}
      <div className="admin-container">
        <button type="button" onClick={() => setOpenModal(true)}>
          Add User
        </button>
        <PixellPayDataTable />
      </div>
    </>
  );
};

export default AdminHome;

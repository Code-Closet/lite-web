import React, { useState } from "react";
import PixellPayDataTable from "../../components/table/PixellPayDataTable";
import Modal from "../../components/modal/Modal";

const AdminHome: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <PixellPayDataTable />
    </>
  );
};

export default AdminHome;

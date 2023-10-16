import "./Modal.scss";

interface ModalProps {
  setOpenModal: (status: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  proceedText?: string;
  cancelText?: string;
  onProceed?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  setOpenModal,
  onProceed,
  children,
  title = "Are You Sure You Want to Continue?",
  proceedText = "Continue",
  cancelText = "Cancel",
}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="body">{children}</div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            {cancelText}
          </button>
          <button onClick={onProceed}>{proceedText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

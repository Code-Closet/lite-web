import "./Modal.scss";

export enum ModalVariant {
  Compact = "compact",
  Regular = "regular",
  Tiny = "tiny",
}

const modalContainerClass: { [name: string]: string } = {
  [ModalVariant.Compact]: "compact-modal",
  [ModalVariant.Regular]: "regular-modal",
  [ModalVariant.Tiny]: "tiny-modal",
};

interface ModalProps {
  setOpenModal: (status: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  proceedText?: string;
  cancelText?: string;
  onProceed?: () => void;
  variant?: ModalVariant;
  isValidForm?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  setOpenModal,
  onProceed,
  children,
  title = "Are You Sure You Want to Continue?",
  proceedText = "Continue",
  cancelText = "Cancel",
  variant = ModalVariant.Compact,
  isValidForm = true,
}) => {
  return (
    <div className="modalBackground">
      <div className={`modalContainer ${modalContainerClass[variant]}`}>
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
          <button onClick={onProceed} disabled={!isValidForm} id="proceedBtn">
            {proceedText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

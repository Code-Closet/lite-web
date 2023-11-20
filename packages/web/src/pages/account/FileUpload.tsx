import { useState } from "react";
import PixellpayToast from "../../components/toast/PixellpayToast";
import { AccountLoadPreview } from "../../model/account/types";
import { accountLoadPreview } from "../../api/account/account";
import { WalletLoadPreview } from "../../model/wallet/types";
import { getWalletLoadPreview } from "../../api/wallet/wallet";
import AccountLoadPreviewTable from "../../components/table/AccountLoadPreviewTable";
import WalletLoadPreviewTable from "../../components/table/WalletLoadPreviewTable";

interface FileUploadProps {
  setIsSummaryView: (isSummaryView: boolean) => void;
  fileType: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ ...props }) => {
  const [accountUploadPreview, setAccountUploadPreview] =
    useState<boolean>(false);
  const [wallettUploadPreview, setWalletUploadPreview] =
    useState<boolean>(false);
  const [accountPreviewData, setAccountPreviewData] = useState<
    AccountLoadPreview[]
  >([]);
  const [walletPreviewData, setWalletPreviewData] = useState<
    WalletLoadPreview[]
  >([]);
  const handleBackClick = () => {
    console.log("back clicked");
    setAccountUploadPreview(false);
    setWalletUploadPreview(false);
    props.setIsSummaryView(true);
  };
  const handleUpload = () => {
    console.log("upload clicked");
    if (props.fileType === "account") {
      accountLoadPreview().then((data) => {
        setAccountPreviewData(data);
        setAccountUploadPreview(true);
      });
    } else {
      getWalletLoadPreview().then((data) => {
        setWalletPreviewData(data);
        setWalletUploadPreview(true);
      });
    }
  };
  const handleConfirm = () => {
    console.log("confirm clicked");
  };

  return (
    <div className="file-upload-container">
      <PixellpayToast />
      <div className="back-button-section">
        <button type="button" onClick={handleBackClick}>
          Back to Summary
        </button>
      </div>
      <div className="file-upload-section">
        <div className="file-upload-desc">
          <input
            type="text"
            placeholder="File Description"
            className="file-input"
          />
        </div>
        <div className="file-upload">
          <input type="file" className="file-input custom-file-input" />
          <button type="button" onClick={handleUpload}>
            <i className="bx bx-upload"></i>
            Upload
          </button>
        </div>
        {accountUploadPreview && (
          <div className="account-upload-preview">
            <AccountLoadPreviewTable previewRowData={accountPreviewData} />
          </div>
        )}
        {wallettUploadPreview && (
          <div className="wallet-upload-preview">
            <WalletLoadPreviewTable previewRowData={walletPreviewData} />
          </div>
        )}
        {(accountUploadPreview || wallettUploadPreview) && (
          <div className="preview-action">
            <button type="button" onClick={handleBackClick}>
              Cancel
            </button>
            <button type="button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

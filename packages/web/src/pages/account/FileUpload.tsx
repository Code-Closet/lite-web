import { useState } from "react";
import PixellpayToast from "../../components/toast/PixellpayToast";
import { AccountLoadPreview } from "../../model/account/types";
//import { accountLoadPreview, fileUpload } from "../../api/account/account";
import { WalletLoadPreview } from "../../model/wallet/types";
import AccountLoadPreviewTable from "../../components/table/AccountLoadPreviewTable";
import WalletLoadPreviewTable from "../../components/table/WalletLoadPreviewTable";
import { AuthData } from "../../auth/AuthGuard";
import { accountBulkLoad, fileUpload } from "../../api/account/account";
import Loading from "../../components/modal/Loading";

interface FileUploadProps {
  setIsSummaryView: (isSummaryView: boolean) => void;
  fileType: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ ...props }) => {
  const { user } = AuthData();
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBatchRecords, setSelectedBatchRecords] = useState<any[]>([]);

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleBackClick = () => {
    console.log("back clicked");
    setAccountUploadPreview(false);
    setWalletUploadPreview(false);
    props.setIsSummaryView(true);
  };
  const handleUpload = () => {
    setLoading(true);
    console.log("upload clicked");
    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedFile ?? new Blob(), selectedFile?.name);
    console.log("form data", formData);
    if (props.fileType === "account") {
      fileUpload(user.financialEntityId, "ACCOUNT_LOAD", formData)
        .then((data) => {
          setAccountPreviewData(data.account_loads);
          setAccountUploadPreview(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    } else {
      fileUpload(user.financialEntityId, "WALLET_LOAD", formData)
        .then((data) => {
          setWalletPreviewData(data.wallet_loads);
          setWalletUploadPreview(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    }
  };
  const handleConfirm = () => {
    if (selectedBatchRecords?.length === 0) return;
    if (props.fileType === "account") {
      console.log("account load preview", selectedBatchRecords);
      const selectedAccounts = selectedBatchRecords.map(
        ({ original }) => original
      );
      if (selectedAccounts?.length > 0) {
        const params = {
          batchType: "FILE_ACCOUNT",
          batch_id: selectedAccounts[0].batchId,
          accounts: selectedAccounts.map((account) => ({
            id: account.id as string,
          })),
        };
        accountBulkLoad(user.financialEntityId, params)
          .then((data) => {
            console.log("account load", data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } else {
      console.log("wallet load preview", selectedBatchRecords);
    }
  };

  return (
    <div className="file-upload-container">
      {loading && <Loading />}
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
          <input
            type="file"
            className="file-input custom-file-input"
            onChange={onFileChange}
          ></input>
          <button type="button" onClick={handleUpload} disabled={!selectedFile}>
            <i className="bx bx-upload"></i>
            Upload
          </button>
        </div>
        {accountUploadPreview && (
          <div className="account-upload-preview">
            <AccountLoadPreviewTable
              previewRowData={accountPreviewData}
              setSelectedRecords={setSelectedBatchRecords}
            />
          </div>
        )}
        {wallettUploadPreview && (
          <div className="wallet-upload-preview">
            <WalletLoadPreviewTable
              previewRowData={walletPreviewData}
              setSelectedRecords={setSelectedBatchRecords}
            />
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

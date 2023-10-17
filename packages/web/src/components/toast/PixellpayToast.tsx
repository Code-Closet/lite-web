import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PixellpayToast: React.FC = () => {
  return (
    <div>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        transition={Slide}
      />
    </div>
  );
};

export default PixellpayToast;

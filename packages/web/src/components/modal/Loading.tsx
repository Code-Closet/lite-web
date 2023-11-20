import { Bars } from "react-loader-spinner";
import "./Loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="loader-container">
      <Bars
        height="80"
        width="80"
        color="#8fa4ed"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;

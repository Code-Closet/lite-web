import React, { useRef, useState } from "react";
import classes from "./Login.module.scss";
import { AuthData } from "../../auth/AuthGuard";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = AuthData();
  const navigate = useNavigate();

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginHandler = async () => {
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      if (login) {
        await login(userName ?? "", password ?? "");
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage("Failed to login. Please try again.");
    }
  };

  return (
    <div className={classes["container"]}>
      <img
        src="logo/pixellpay_lite.png"
        alt="PixellPay"
        style={{ height: 600 }}
      ></img>
      <div className={classes["login-box"]}>
        <div>
          <label>Username</label>
          <input
            ref={userNameRef}
            type="text"
            id="username"
            placeholder="admin"
          ></input>
        </div>

        <div>
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="password"
          ></input>
        </div>
        <button onClick={() => void loginHandler()}>Login</button>
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
      </div>
    </div>
  );
};

export default Login;

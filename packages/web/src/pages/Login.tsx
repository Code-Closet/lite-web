import React from "react";
import classes from "./Login.module.scss";

const Login: React.FC = () => {
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
          <input></input>
        </div>

        <div>
          <label>Password</label>
          <input type="password"></input>
        </div>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Login;

import { createContext, useContext, useState } from "react";
import { RenderRoutes } from "../router/RenderRoutes";
//import SideMenu from "../components/menu/SideMenu";
import { authenticateUser, authenticateUser1 } from "../api/auth/auth";

interface AuthContextProps {
  user: { name: string; isAuthenticated: boolean };
  login?: (a: string, b: string) => Promise<string>;
  logout?: () => void;
}
const AuthContext = createContext<AuthContextProps>({
  user: { name: "", isAuthenticated: false },
});
export const AuthData = () => useContext(AuthContext);

export const AuthGuard = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });

  const login = (userName: string, password: string): Promise<string> => {
    // Make a call to the authentication API to check the username
    // Delete this block of code once the real api is ready
    return new Promise((resolve, reject) => {
      authenticateUser1()
        .then((response) => {
          setUser({
            name: response.user,
            isAuthenticated: response.isAuthenticated,
          });
          resolve("success");
        })
        .catch((error) => reject(error));
    });

    return new Promise((resolve, reject) => {
      authenticateUser(userName, password)
        .then((response) => {
          setUser({
            name: response.user,
            isAuthenticated: response.isAuthenticated,
          });
          resolve("success");
        })
        .catch((error) => reject(error));
    });

    // return new Promise((resolve, reject) => {
    //   if (userName === "admin" && password === "password") {
    //     setUser({ name: userName, isAuthenticated: true });
    //     resolve("success");
    //   } else {
    //     reject("Incorrect password");
    //   }
    // });
  };
  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};

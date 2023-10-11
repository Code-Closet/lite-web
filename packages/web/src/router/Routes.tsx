import AdminHome from "../pages/admin/AdminHome";
import WalletHome from "../pages/wallet/WalletHome";
import Login from "../pages/login/Login";

export interface V6Route {
  path: string;
  element: React.ReactElement;
  title?: string;
  isMenu?: boolean;
  isPrivate?: boolean;
  children?: V6Route[];
}

const navigation: V6Route[] = [
  {
    path: "/",
    title: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/admin",
    title: "Admin",
    element: <AdminHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/wallets",
    title: "Wallets",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
];
export default navigation;

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
    path: "/wallets",
    title: "Dashboard",
    element: <AdminHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/admin",
    title: "Manage User",
    element: <AdminHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/wallets",
    title: "Transactions",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/wallets",
    title: "Reports",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/wallets",
    title: "Approvals",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/wallets",
    title: "Settings",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
];
export default navigation;

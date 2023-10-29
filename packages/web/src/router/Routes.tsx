import AdminHome from "../pages/admin/AdminHome";
import WalletHome from "../pages/wallet/WalletHome";
import Login from "../pages/login/Login";
import Transactions from "../pages/wallet/Transactions";
import AccountBulkHome from "../pages/account/AccountBulkHome";

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
    path: "/dashboard",
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
    path: "/transactions",
    title: "Bulk Transactions",
    element: <Transactions />,
    isMenu: true,
    isPrivate: true,
    children: [
      {
        path: "wallet",
        title: "Wallet Transactions",
        element: <WalletHome />,
      },
      {
        path: "account",
        title: "Account Transactions",
        element: <AccountBulkHome />,
      },
    ],
  },
  {
    path: "/accounts",
    title: "Accounts",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/reports",
    title: "Reports",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/approvals",
    title: "Approvals",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/settings",
    title: "Settings",
    element: <WalletHome />,
    isMenu: true,
    isPrivate: true,
  },
];
export default navigation;

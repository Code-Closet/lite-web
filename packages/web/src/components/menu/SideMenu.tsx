import { Link } from "react-router-dom";
import { AuthData } from "../../auth/AuthGuard";
import "./SideMenu.css";
import navigation, { V6Route } from "../../router/Routes";
import { useState } from "react";

const iconMap: { [key: string]: string } = {
  Dashboard: "bx-home",
  "Manage User": "bx-user-plus",
  Transactions: "bx-wallet",
  Reports: "bx-bar-chart-alt-2",
  Approvals: "bx-like",
  Settings: "bx-cog",
};

const SideMenu: React.FC = () => {
  const { user, logout } = AuthData();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const MenuItem = ({ r }: { r: V6Route }) => {
    return (
      <li>
        <span className="menu-item">
          <i className={`bx ${iconMap[r.title ?? ""]} icon`}></i>
          <Link to={r.path} className="nav-link">
            {r.title}
          </Link>
        </span>
      </li>
    );
  };

  return user.isAuthenticated ? (
    <nav className={`sidebar ${collapsed ? "close" : ""}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="./logo/pixellpay-menu.png" alt="Pixell Pay Lite" />
          </span>
        </div>
        <i
          className="bx bx-chevron-right toggle"
          onClick={() => setCollapsed((prev) => !prev)}
        ></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            {navigation.map((r, i) => {
              if (!r.isPrivate && r.isMenu) {
                return <MenuItem key={i} r={r} />;
              } else if (user.isAuthenticated && r.isMenu) {
                return <MenuItem key={i} r={r} />;
              } else return false;
            })}
          </ul>
        </div>
        <div className="bottom-content">
          <li>
            <span className="menu-item">
              <i className={`bx bx-log-out icon`}></i>
              <Link to={"#"} onClick={logout} className="nav-link">
                Log out
              </Link>
            </span>
          </li>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default SideMenu;

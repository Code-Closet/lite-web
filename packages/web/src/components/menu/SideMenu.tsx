import { Link } from "react-router-dom";
import { AuthData } from "../../auth/AuthGuard";
import "./SideMenu.css";
import navigation, { V6Route } from "../../router/Routes";

const SideMenu: React.FC = () => {
  const { user, logout } = AuthData();
  const MenuItem = ({ r }: { r: V6Route }) => {
    return (
      <div className="menuItem">
        <Link to={r.path}>{r.title}</Link>
      </div>
    );
  };

  return user.isAuthenticated ? (
    <div className="menu">
      {navigation.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else if (user.isAuthenticated && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else return false;
      })}
      <div className="menuItem" style={{ float: "right" }}>
        <Link to={"#"} onClick={logout}>
          Log out
        </Link>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SideMenu;

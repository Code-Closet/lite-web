import React from "react";
import "../styles/global.scss";
import SideMenu from "../components/menu/SideMenu";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      <SideMenu />
      <div className="layout">{children}</div>
    </main>
  );
};

export default Layout;

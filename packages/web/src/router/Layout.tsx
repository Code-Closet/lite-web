import React from "react";
import "../styles/global.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      <div className="layout">{children}</div>
    </main>
  );
};

export default Layout;

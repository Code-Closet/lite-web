import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      <div className="w-[100%] overflow-auto">{children}</div>
    </main>
  );
};

export default Layout;

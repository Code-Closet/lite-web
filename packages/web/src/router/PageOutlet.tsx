import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";

/* Authenticate the user before rendering the Layout */
const PageOutlet: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <Outlet />
      </Layout>
    </Fragment>
  );
};

export default PageOutlet;

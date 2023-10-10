import React, { Fragment } from "react";
import Footer from "footer";
import { RouterProvider } from "react-router-dom";
import router from "./router/Routes";

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
